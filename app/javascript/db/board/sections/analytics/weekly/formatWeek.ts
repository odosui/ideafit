const WEEK_FORMAT = new Intl.DateTimeFormat(undefined, {
  day: 'numeric',
  month: 'short',
})

export const formatWeek = (week: string) =>
  WEEK_FORMAT.format(new Date(`${week}T00:00:00`))
