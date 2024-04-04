export const useDateTime = (date) => {
  return useToISOString(date).split('T')[0]
}
