import * as moment from 'moment';

export function dateFormat (date, formatStr = 'YYYY-MM-DD HH:mm:ss') {
  if (moment.isDate(date)) {
    return moment(date).format(formatStr);
  }
  return '-'
}