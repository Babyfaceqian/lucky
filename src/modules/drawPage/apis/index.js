import { worm } from 'utils';
import { PREFIX } from 'config/apiConfig';
function makeRequestCreator(url, method) {
  if (method == 'post') {
    return async function (params) {
      return worm.post(url, params);
    };
  } else {
    return async function (params) {
      return worm.get(url, params);
    }
  }
}
export const getTemplate = makeRequestCreator(PREFIX + '/getTemplate', 'get')
export const getNameList = makeRequestCreator(PREFIX + '/getNameList', 'get')
export const upload = makeRequestCreator(PREFIX + '/upload', 'post')
export const reset = makeRequestCreator(PREFIX + '/reset', 'get')