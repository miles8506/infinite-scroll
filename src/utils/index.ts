import dayjs from 'dayjs'

export function dateFormat(timeStamp: number, formatString = 'YYYY/MM/DD') {
  return dayjs(timeStamp).format(formatString)
}

export function transformValueOf(value: Date | string) {
  return dayjs(value).valueOf()
}
