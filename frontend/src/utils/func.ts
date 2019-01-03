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