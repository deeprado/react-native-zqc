import {getDistance} from 'geolib';
// TODO getDistance 存在错误
export function distanceText(local, remote) {
  if (!local.position || !remote) {
    return '未知';
  }

  let {coords} = local.position;
  let distance = getDistance(coords, remote) || 0;
  if (distance < 10) {
    return '<10m';
  } else if (distance >= 10 && distance < 1000) {
    return distance + 'm';
  } else {
    return Math.round(distance / 1000) + 'km';
  }
}
