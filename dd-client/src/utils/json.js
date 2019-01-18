/**
 *
 * @copyright(c) 2017
 * @created by  shelwin
 * @package dbaas-ui
 * @version :  2017-04-05 16:58 $
 */

import Logger from './logger';

export default class Json {
  static loads(val) {
    let value = '';
    try {
      value = JSON.parse(val);
    } catch (err) {
      Logger.debug('json parse error:' + err);
      Logger.debug('json val==>' + val);
      return val; // 解析失败返回原值
    }
    return value;
  }

  static dumps(val) {
    return JSON.stringify(val);
  }
}
