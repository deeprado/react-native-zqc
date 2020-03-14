import {getApi} from './common';

export function userInfo(id) {
  return getApi('/user/info', {id});
}

export function userInfos(ids) {
  return getApi('/user/infos', {ids: ids.join(',')});
}

export function userStats(ids) {
  return getApi('/user/stats', {ids: ids.join(',')});
}

export function nearbyUsers({location, distance = '', limit = 10}) {
  let {longitude, latitude} = location;
  return getApi('/user/nearby', {
    location: `${longitude},${latitude}`,
    distance,
    limit,
  });
}
