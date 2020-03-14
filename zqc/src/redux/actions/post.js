import {POST_STATUS_NORMAL} from '../../const';
import * as apis from '../../apis';

import {cachePostByIds, cachePosts} from './object';
import {handleError, errorFlash} from './error';

export function resetPost() {
  return {
    type: 'RESET_POST',
  };
}

export function postInfo({postId, cbOk, cbFail, cbFinish}) {
  return dispatch => {
    dispatch(cachePostByIds({postIds: [postId], update: true}))
      .then(posts => {
        if (cbFinish) {
          cbFinish();
        }
        if (cbOk) {
          cbOk(posts);
        }
      })
      .catch(error => {
        if (cbFinish) {
          cbFinish();
        }
        if (cbFail) {
          cbFail(error);
        } else {
          dispatch(handleError(error));
        }
      });
  };
}

export function nearbyPosts({offset = '', cbOk, cbFail, cbFinish} = {}) {
  return (dispatch, getState) => {
    let {
      location: {position},
    } = getState();
    let {account} = getState();

    if (!position) {
      if (cbFinish) {
        cbFinish();
      }
      dispatch(errorFlash('无法获取当前位置。'));
      return;
    }

    let {coords: location} = position;
    apis
      .nearbyPosts({
        location,
        sportCode: account.settings.sport.code,
        status: POST_STATUS_NORMAL,
        offset,
      })
      .then(response => {
        let {
          data: {posts},
        } = response;
        return dispatch(cachePosts({posts}));
      })
      .then(posts => {
        if (cbFinish) {
          cbFinish();
        }
        let postIds = posts
          .filter(v => v.status === POST_STATUS_NORMAL)
          .map(v => v.id);
        if (offset === '') {
          dispatch({type: 'SET_NEARBY_POSTS', postIds});
        } else {
          dispatch({type: 'APPEND_NEARBY_POSTS', postIds});
        }
        if (cbOk) {
          cbOk(posts);
        }
      })
      .catch(error => {
        if (cbFinish) {
          cbFinish();
        }
        if (cbFail) {
          cbFail(error);
        } else {
          dispatch(handleError(error));
        }
      });
  };
}

export function postsOfCity({
  cityCode = '',
  offset = '',
  cbOk,
  cbFail,
  cbFinish,
}) {
  return (dispatch, getState) => {
    let {account} = getState();

    apis
      .postsOfCity({
        cityCode,
        sportCode: account.settings.sport.code,
        status: POST_STATUS_NORMAL,
        offset,
      })
      .then(response => {
        let {
          data: {posts},
        } = response;
        return dispatch(cachePosts({posts}));
      })
      .then(posts => {
        if (cbFinish) {
          cbFinish();
        }
        let postIds = posts
          .filter(v => v.status === POST_STATUS_NORMAL)
          .map(v => v.id);
        if (offset === '') {
          dispatch({type: 'SET_POSTS_OF_CITY', cityCode, postIds});
        } else {
          dispatch({type: 'APPEND_POSTS_OF_CITY', cityCode, postIds});
        }
        if (cbOk) {
          cbOk(posts);
        }
      })
      .catch(error => {
        if (cbFinish) {
          cbFinish();
        }
        if (cbFail) {
          cbFail(error);
        } else {
          dispatch(handleError(error));
        }
      });
  };
}

export default {
  resetPost,
  postInfo,
  nearbyPosts,
  postsOfCity,
};
