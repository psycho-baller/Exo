import { RouterOutputs } from '@acme/api'
import { api } from '@acme/api/utils/trpc'

export function formatDate(inputDate: Date): string {
  const getYear = (date: Date): string => {
    const currentYear: number = new Date().getFullYear()
    return date.getFullYear() !== currentYear ? `, ${date.getFullYear()}` : ''
  }

  const getMonthAndDay = (date: Date): string => {
    const dateOptions: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
    }
    return date.toLocaleString('default', dateOptions)
  }

  const isToday = (date: Date): boolean => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const dateWithoutTime = new Date(date.getTime())
    dateWithoutTime.setHours(0, 0, 0, 0)
    return dateWithoutTime.getTime() === today.getTime()
  }

  const getTimeString = (date: Date): string => {
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
    }
    return date.toLocaleString('default', timeOptions)
  }

  // Check if the input date is today
  if (isToday(inputDate)) {
    // If the input date is today, format the time and return it
    return getTimeString(inputDate)
  }

  // Get month abbreviation and day
  const monthAndDay: string = getMonthAndDay(inputDate)

  // Get year if it's different from the current year
  const year: string = getYear(inputDate)

  // Concatenate the results
  const formattedDate = `${monthAndDay}${year}`

  return formattedDate
}
