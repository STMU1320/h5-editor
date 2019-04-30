import { toUpperCase, objToQueryString as objToString, isEmpty, isUrl, parseUrlParams  } from '../../../common/utils';

export { toUpperCase, objToString, isEmpty, isUrl, parseUrlParams }

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