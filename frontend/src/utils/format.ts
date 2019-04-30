import * as moment from 'moment';

export function dateFormat (date: string | Date, formatStr = 'YYYY-MM-DD HH:mm:ss') {
  const m = moment(date);
  if (m.isValid()) {
    return m.format(formatStr);
  }
  return '-'
}