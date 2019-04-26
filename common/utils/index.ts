import { urlReg } from './reg';

export const isUrl = (url: string) => urlReg.test(url);

export function toUpperCase (str: string, length?: number): string {
  if (!str) {
    return ''
  }
  length = length || str.length;
  let pad = str.length - length;
  let up = str.toUpperCase();
  let result = up.slice(0, length);
  if (pad > 0) {
    result += str.slice(length, str.length);
  }

  return result;
}

export function objToQueryString (obj: any): string {
  let str = '';
  if (obj && typeof obj === 'object') {
    str = Object.keys(obj)
      .map((key: string) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
      .join('&');
  }
  return str;
}

export function isEmpty(value: any) {
  if (value == null || value === '') {
    return true;
  } else if (Array.isArray(value)) {
    return value.length === 0;
  } else if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }
  return false;
}

export function parseUrlParams (url = '') {
  if (!isUrl(url)) {
    return {};
  }
  let result: any = {};
  let search = url.split('?')[1];
  if (search) {
    const group = search.split('&');
    group.forEach((item: string) => {
      const itemArr = item.split('=');
      const key = itemArr[0] && decodeURIComponent(itemArr[0]), value = itemArr[1] && decodeURIComponent(itemArr[1]);
      result[key] = value;
    });
  }
  return result;
}

export function parseUrl (url: string = '') {
  if (!isUrl(url)) {
    return {};
  }
  let a = document.createElement('a');
  a.href = url;
  const result = {
    origin: a.origin,
    protocol: a.protocol.replace(':',''),
    host: a.hostname, 
    port: a.port, 
    query: a.search,
    hash: a.hash.replace('#',''), 
    path: a.pathname.replace(/^([^\/])/,'/$1'),
  }

  a = null;
  return result;
}