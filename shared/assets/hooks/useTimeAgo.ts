import { useTranslation } from '@/shared/assets'

const getRussianPlural = (number: number, forms: [string, string, string]): string => {
  const cases = [2, 0, 1, 1, 1, 2]

  return forms[number % 100 > 4 && number % 100 < 20 ? 2 : cases[Math.min(number % 10, 5)]]
}

export const useTimeAgo = (createdAt: string): string => {
  const { locale } = useTranslation()
  const now = new Date()
  const created = new Date(createdAt)
  const diffInSeconds = Math.floor((now.getTime() - created.getTime()) / 1000)

  const years = now.getFullYear() - created.getFullYear()
  const months = now.getMonth() - created.getMonth() + years * 12
  const days = Math.floor(diffInSeconds / (3600 * 24))
  const hours = Math.floor(diffInSeconds / 3600)
  const minutes = Math.floor(diffInSeconds / 60)

  if (locale === 'ru') {
    if (years > 0) {
      return `${years} ${getRussianPlural(years, ['год', 'года', 'лет'])} назад`
    } else if (months > 0) {
      return `${months} ${getRussianPlural(months, ['месяц', 'месяца', 'месяцев'])} назад`
    } else if (days > 0) {
      return `${days} ${getRussianPlural(days, ['день', 'дня', 'дней'])} назад`
    } else if (hours > 0) {
      return `${hours} ${getRussianPlural(hours, ['час', 'часа', 'часов'])} назад`
    } else if (minutes > 0) {
      return `${minutes} ${getRussianPlural(minutes, ['минута', 'минуты', 'минут'])} назад`
    } else {
      return 'Только что'
    }
  } else {
    // For English
    if (years > 0) {
      return `${years} year${years !== 1 ? 's' : ''} ago`
    }
    if (months > 0) {
      return `${months} month${months !== 1 ? 's' : ''} ago`
    }
    if (days > 0) {
      return `${days} day${days !== 1 ? 's' : ''} ago`
    }
    if (hours > 0) {
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`
    }
    if (minutes > 0) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`
    }

    return 'Just now'
  }
}
