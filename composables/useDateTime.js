export const useDateTime = (date) => {
  var date = new Date(date)
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  return date.toISOString().split("T")[0]
}
