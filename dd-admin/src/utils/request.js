import fetch from 'dva/fetch';
import querystring from 'querystring';

const formatJson = (k, v) => {
  if (v === undefined) {
    return '';
  }
  return v;
};

function check401(response) {
  if (response.status === 401) {
    const key = 'Unauthorized';
    return Promise.reject({ key });
  }
  return response;
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function jsonParse(res) {
  if (res.status !== 200) {
    return Promise.reject(res);
  }
  return res.json().then(result => {
    if (result) {
      if (result.isError) {
        console.log('result.isError');
        return Promise.reject(new Error(result.message));
      } else {
        return result.data;
      }
    }
    return null;
  });
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url
 * @param  {object} [options]
 * @return {object}
 */
function request(url, options) {
  const opts = { ...options };
  opts.credentials = 'include';
  opts.headers = {
    ...opts.headers,
    'Content-Type': 'application/json;charset=utf-8'
  };

  return fetch(url, opts)
    .then(checkStatus)
    .then(check401)
    .then(jsonParse)
    .catch(err => {
      throw new Error(`${err.message}`, err.message || '错误');
    });
}

/**
 * post。
 * @param url
 * @param data
 * @param options
 */
function post(url, data = {}, options) {
  return request(url, { ...options, method: 'POST', body: JSON.stringify(data, formatJson) });
}

/**
 * delete
 * @param url
 * @param options
 */
function del(url, options) {
  return request(url, { ...options, method: 'DELETE' });
}

/**
 * put
 * @param url
 * @param data
 * @param options
 */
function put(url, data = {}, options) {
  return request(url, { ...options, method: 'PUT', body: JSON.stringify(data, formatJson) });
}
/**
 * patch
 * @param url
 * @param data
 * @param options
 */
function patch(url, data = {}, options) {
  return request(url, { ...options, method: 'PATCH', body: JSON.stringify(data, formatJson) });
}

/**
 * get
 * @param url
 * @param options
 */
function get(url, data, options) {
  return request(`${url}${data ? '?' + querystring.stringify(data) : ''}`, {
    ...options,
    method: 'GET'
  });
}

export { post, del, put, patch, get };
