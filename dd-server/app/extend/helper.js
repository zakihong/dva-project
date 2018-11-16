//格式化日期
Date.prototype.format = function(fmt) {
  let o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, String(this.getFullYear()).substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(String(o[k]).length));
    }
  }
  return fmt;
};

Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

module.exports = {
  formatDate(nS, format) {
    //日期格式化
    if (!nS) {
      return '';
    }
    format = format || 'yyyy-MM-dd hh:mm:ss';
    return new Date(nS).format(format);
  },
  pick(obj, arr) {
    return arr.reduce((iter, val) => (val in obj && (iter[val] = obj[val]), iter), {});
  },
  whereAndEq(obj) {
    let result = {};
    for (key in obj) {
      if (obj[key] !== '' && obj[key] != null && obj[key] != undefined) {
        result[key] = obj[key];
      }
    }
    return result;
  },
  whereAndLike(obj) {
    let result = {};
    for (key in obj) {
      if (obj[key] !== '' && obj[key] != null && obj[key] != undefined) {
        result[key] = {
          $like: `%${obj[key]}%`
        };
      }
    }
    return result;
  },
  whereOrLike(obj) {
    let result = {};
    let filters = this.whereAndLike(obj);
    if (Object.keys(filters).length) {
      result = { $or: filters };
    }
    return result;
  },
  whereStatus(status) {
    let result = {};

    if (status == undefined || status == null) {
      status = '';
    }

    if (!(status == 0 || status == 1 || status === '')) {
      status = -1; //非正常状态值（0,1）， 设置个数据库中不会存在的值来查询
    }

    if (status !== '') {
      result = { status };
    } else {
      result = {
        status: {
          $in: [0, 1]
        }
      };
    }
    return result;
  },
  whereDate(obj) {
    if (obj.start && obj.end) {
      return {
        $gte: new Date(obj.start),
        $lte: new Date(obj.end)
      };
    } else if (obj.start) {
      return {
        $gte: new Date(obj.start)
      };
    } else if (obj.end) {
      return {
        $lte: new Date(obj.end)
      };
    } else {
      return {
        $lte: new Date()
      };
    }
  },
  compareDiff(oldValue, newValue) {
    let result = {
      oldValue: [],
      newValue: []
    };

    for (let key in newValue) {
      if (newValue[key] != oldValue[key]) {
        result.oldValue.push(oldValue[key]);
        result.newValue.push(newValue[key]);
      }
    }
    return result;
  }
};
