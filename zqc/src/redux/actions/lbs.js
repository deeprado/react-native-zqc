import * as apis from '../../apis';

import {handleError} from './error';

export function lbsRegeo({longitude, latitude, cbOk}) {
  return dispatch => {
    apis
      .lbsRegeo({longitude, latitude})
      .then(response => {
        let {
          data: {address},
        } = response;
        let city = {
          name: address.city,
          code: address.cityCode,
        };
        let m = city.name.match(/^(.+)市$/);
        if (m) {
          city.name = m[1];
        }
        if (cbOk) {
          cbOk(city);
        }
      })
      .catch(error => dispatch(handleError(error)));
  };
}

export default {
  lbsRegeo,
};
