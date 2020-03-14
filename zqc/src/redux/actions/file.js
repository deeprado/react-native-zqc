import * as apis from '../../apis';

import {cacheFiles} from './object';
import {handleError} from './error';

export function uploadFileP(
  {path, mime, size = 0, pixelSize = '', duration = 0, bucket = 'zqc-img'},
  {timeout = 10000, background = false, onUploadProgress} = {},
) {
  return dispatch => {
    return apis
      .uploadFile(
        {path, mime, size, pixelSize, duration, bucket},
        {timeout, background, onUploadProgress},
      )
      .then(response => {
        let {
          data: {file},
        } = response;
        return dispatch(cacheFiles({files: [file]}));
      })
      .then(files => files[0]);
  };
}

export function uploadFile(
  {
    path,
    mime,
    size = 0,
    pixelSize = '',
    duration = 0,
    bucket = 'zqc-img',
    cbOk,
  },
  {timeout = 10000, background = false, onUploadProgress} = {},
) {
  return dispatch => {
    return dispatch(
      uploadFileP(
        {path, mime, size, pixelSize, duration, bucket},
        {timeout, background, onUploadProgress},
      ),
    )
      .then(file => {
        if (cbOk) {
          cbOk(file);
        }
      })
      .catch(error => dispatch(handleError(error)));
  };
}

export default {
  uploadFileP,
  uploadFile,
};
