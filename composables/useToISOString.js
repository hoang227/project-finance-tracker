export const useToISOString = (date) => {
  var date = new Date(date)
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  return date.toISOString()
}