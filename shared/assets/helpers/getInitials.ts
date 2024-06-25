export const getInitials = (inputString: string) => {
  const words = inputString.trim().split(/\s+/)
  const firstInitial = words[0] ? words[0].charAt(0).toUpperCase() : ''
  const secondInitial = words[1] ? words[1].charAt(0).toUpperCase() : ''

  return firstInitial + secondInitial
}
