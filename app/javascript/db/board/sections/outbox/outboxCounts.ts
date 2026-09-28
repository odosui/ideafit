import { countUnit } from '../analytics/weekly/countUnit'

const changeUnit = countUnit('status change', 'status changes')
const emailUnit = countUnit('email', 'emails')
const personUnit = countUnit('person', 'people')

export const changesCount = (count: number) => `${count} ${changeUnit(count)}`
export const emailsCount = (count: number) => `${count} ${emailUnit(count)}`
export const peopleCount = (count: number) => `${count} ${personUnit(count)}`
