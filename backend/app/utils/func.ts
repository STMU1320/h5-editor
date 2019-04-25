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

export function objToString (obj: any): string {
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
