export const formatDatetime = (datetime: string): string => {
  const date = new Date(datetime);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}