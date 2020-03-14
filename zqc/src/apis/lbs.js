import {getApi} from './common';

export function lbsRegeo(location) {
  let {longitude, latitude} = location;
  return getApi('/lbs/regeo', {
    location: `${longitude},${latitude}`,
  });
}
