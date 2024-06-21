const MAX_SIZE_FILE = 10 * 1024 * 1024

export const checkPhoto = (file: File, errorSize: string, errorType: string) => {
  if (file.size > MAX_SIZE_FILE) {
    return errorSize
  }
  const validFileTypes = ['image/jpeg', 'image/png']

  if (!validFileTypes.includes(file.type)) {
    return errorType
  }

  return null
}
