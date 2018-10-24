module.exports = {
  success(param) {
    this.body = {
      data: param,
      errorCode: 1,
      errorMsg: ''
    };
  },
  fail(msg) {
    this.body = {
      data: '',
      errorCode: 0,
      errorMsg: msg instanceof Array ? msg[0] : msg
    };
  }
};
