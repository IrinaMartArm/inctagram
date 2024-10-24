import { useTranslation } from '@/shared/assets'

const getRussianPlural = (number: number, forms: [string, string, string]): string => {
  const cases = [2, 0, 1, 1, 1, 2]

  if (number % 10 === 1 && number % 100 !== 11) {
    return forms[0] // Singular form for 1
  }

  return forms[number % 100 > 4 && number % 100 < 20 ? 2 : cases[Math.min(number % 10, 5)]]
}

export const useTimeAgo = (createdAt: string): string => {
  const { locale } = useTranslation()
  const now = new Date()
  const created = new Date(createdAt)
  const diffInSeconds = Math.floor((now.getTime() - created.getTime()) / 1000)

  const years = now.getFullYear() - created.getFullYear()
  const months = now.getMonth() - created.getMonth() + years * 12

  const diffInDays = Math.floor(diffInSeconds / (3600 * 24))
  const diffInHours = Math.floor(diffInSeconds / 3600)
  const diffInMinutes = Math.floor(diffInSeconds / 60)

  if (locale === 'ru') {
    if (years > 0) {
      return `${years} ${getRussianPlural(years, ['год', 'года', 'лет'])} назад`
    } else if (months > 0 && diffInDays >= 30) {
      return `${months} ${getRussianPlural(months, ['месяц', 'месяца', 'месяцев'])} назад`
    } else if (diffInDays > 0) {
      return `${diffInDays} ${getRussianPlural(diffInDays, ['день', 'дня', 'дней'])} назад`
    } else if (diffInHours > 0) {
      return `${diffInHours} ${getRussianPlural(diffInHours, ['час', 'часа', 'часов'])} назад`
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} ${getRussianPlural(diffInMinutes, ['минуту', 'минуты', 'минут'])} назад`
    } else {
      return 'Только что'
    }
  } else {
    // For English
    if (years > 0) {
      return `${years} year${years !== 1 ? 's' : ''} ago`
    }
    if (months > 0 && diffInDays >= 30) {
      return `${months} month${months !== 1 ? 's' : ''} ago`
    }
    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`
    }
    if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`
    }
    if (diffInMinutes > 0) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`
    }

    return 'Just now'
  }
}
