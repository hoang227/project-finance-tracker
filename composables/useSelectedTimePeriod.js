import { startOfYear, endOfYear, startOfMonth, endOfMonth, startOfDay, endOfDay, sub } from 'date-fns'

export const useSelectedTimePeriod = (period) => {
  const current = computed(
    () => {
      switch (period.value) {
        case 'yearly':
          return {
            from: startOfYear(new Date()),
            to: new Date()
          }
        case 'monthly':
          return {
            from: startOfMonth(new Date()),
            to: new Date()
          }
        case 'daily':
          return {
            from: startOfDay(new Date()),
            to: new Date()
          }
      }
    }
  )
  const previous = computed(
    () => {
      switch (period.value) {
        case 'yearly':
          return {
            from: startOfYear(sub(new Date(), { years: 1 })),
            to: endOfYear(sub(new Date(), { years: 1 }))
          }
        case 'monthly':
          return {
            from: startOfMonth(sub(new Date(), { months: 1 })),
            to: endOfMonth(sub(new Date(), { months: 1 }))
          }
        case 'daily':
          return {
            from: startOfDay(sub(new Date(), { days: 1 })),
            to: endOfDay(sub(new Date(), { days: 1 }))
          }
      }
    }
  )
  return { current, previous }
}