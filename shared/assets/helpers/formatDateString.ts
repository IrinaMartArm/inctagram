export const formatDateString = (dateString: null | string) => {
  return dateString
    ? new Date(dateString).toLocaleDateString('ru-RU', {
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        month: '2-digit',
        second: '2-digit',
        year: 'numeric',
      })
    : null
}
