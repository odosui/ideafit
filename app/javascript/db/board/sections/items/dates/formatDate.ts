const DATE_FORMAT = new Intl.DateTimeFormat(undefined, {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

export const formatDate = (iso: string) => DATE_FORMAT.format(new Date(iso))

const DATE_TIME_FORMAT = new Intl.DateTimeFormat(undefined, {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
})

export const formatDateTime = (iso: string) => DATE_TIME_FORMAT.format(new Date(iso))
