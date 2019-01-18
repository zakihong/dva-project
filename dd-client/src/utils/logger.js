/**
 *
 * @copyright(c) 2017
 * @created by  shelwin
 * @package dbaas-ui
 * @version :  2017-04-06 10:12 $
 */

export default class Logger {
  static print(level, ...message) {
    let globalLevel = window.LOG_LEVEL || 'debug';
    let levels = ['debug', 'info', 'warn', 'error'];

    if (levels.indexOf(level) >= levels.indexOf(globalLevel)) {
      message.unshift('[DBaaS]');
      if (level in console) {
        console[level](...message);
      } else {
        console.log(...message);
      }
    }
  }
  static debug(...message) {
    return Logger.print('debug', ...message);
  }
  static info(...message) {
    Logger.print('info', ...message);
  }
  static warn(...message) {
    Logger.print('warn', ...message);
  }
  static error(...message) {
    Logger.print('error', ...message);
  }
}
