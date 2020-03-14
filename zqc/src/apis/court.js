import {getApi} from './common';

export function courtInfo(id) {
  return getApi('/court/info', {id});
}

export function courtInfos(ids) {
  return getApi('/court/infos', {ids: ids.join(',')});
}

export function courtStats(ids) {
  return getApi('/court/stats', {ids: ids.join(',')});
}
