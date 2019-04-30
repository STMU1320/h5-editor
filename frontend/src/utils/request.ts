import { objToString } from './func';
import {isUrl } from './reg';
const domainConfig = require('../../../common/config/domain.json');

export function getApiOrigin (path: string): string {
  // to do
  let origin = domainConfig.api;
  return `${origin}${path}`
}

export function objToFormData (obj: any): FormData {
  let out = new FormData();
  if (obj && typeof obj === 'object') {
    Object.keys(obj).forEach((key: string) => {
      out.append(key, obj[key])
    });
  }
  return out;
}

const defaultHeaders: any = {
  'Content-Type': 'application/json'
};

async function ajax (url: string, options: any) {

  let isUpload = options && options.upload;
  let requestOptions: any = {};
  if (isUpload) {
    // 上传文件单独处理
    requestOptions.method = 'POST';
    requestOptions.headers = options.headers;
    requestOptions.body = objToFormData(options.body);
  } else {
    // 设置headers
    let headersOptions = { ...defaultHeaders };
    if (options && options.headers) {
      headersOptions = Object.assign(headersOptions, options.headers);
    }
  
    // 设置request
    requestOptions = { ...options, headers: headersOptions };
    if (typeof requestOptions.body === 'object') {
      requestOptions.body = JSON.stringify(requestOptions.body);
    }
  }
  const requestUrl = isUrl(url) ? url : getApiOrigin(url);
  const request = new Request(requestUrl, requestOptions );

  const response: any = await fetch(request);
  const contentType = response.headers.get('Content-Type') || '';
  let data: any;
  switch (true) {
    case contentType.includes('json') > -1:
      data = await response.json();
      break;
    case contentType.includes('text') > -1:
      data = await response.text();
      break;
    default:
      data = await response.blob();
      break;
    }
  if (response.status === 403 || response.status === 401) {
    // 这里处理没有权限的情况
    throw { msg: data.msg || 'Forbidden', code: response.status };
  } else if (response.status === 400) {
    throw { msg: data.msg, code: response.status };
  } else if (response.status === 500) {
    throw { msg: data.msg, code: response.status };
  } else {
    // 处理服务器约定的请求错误
    // if (data.State === 0) {
    //   throw data;
    // }
    return data;
  }
}

export interface Request {
  get: Function;
  post: Function;
}

const request: Request = {
  get (url: string, params?: any, options?: any) {
    let apiUrl = url;
    const join = ~apiUrl.indexOf('?') ? '&' : '?';
    const paramsStr = objToString(params);
    if (paramsStr) {
      apiUrl = `${url}${join}${paramsStr}`;
    }
    return ajax(apiUrl, Object.assign({ method: 'GET' }, options));
  },
  post (url: string, params?: any, options?: any) {
    const defaultOptions = {
      method: 'POST',
      body: params
    };
    return ajax(url, Object.assign(defaultOptions, options));
  }
};

export default request;
