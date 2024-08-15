import { ABOUT_ME_REGEX, ME_REGEX, USERNAME_REGEX } from '@/entities/auth/model/auth-validation'
import { LocaleType } from '@/locales/ru'
import z from 'zod'

const currentDate = new Date()
const thirteenYearsAgo = new Date()

thirteenYearsAgo.setFullYear(currentDate.getFullYear() - 13)

const isValidDateFormat = (dateString: string | undefined): boolean => {
  if (!dateString) {
    return false
  }

  // Check if the date string matches the pattern dd.MM.yyyy
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/

  if (!dateRegex.test(dateString)) {
    return false
  }

  // Further validation to check if the day and month make sense
  const [day, month, year] = dateString.split('.').map(Number)
  const date = new Date(year, month - 1, day)

  // Check if the date object was created successfully and is valid
  return !(date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day)
}

export const profileFormSchema = (t: LocaleType) => {
  return z.object({
    aboutMe: z.string().max(200, `${t.profileSettings.errors.aboutMe}`).optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    dateOfBirth: z
      .string()
      .refine(
        dateString => {
          if (!dateString) {
            return true
          }
          const dateOfBirth = new Date(dateString.split('.').reverse().join('-'))

          return dateOfBirth <= thirteenYearsAgo
        },
        {
          message: t.profileSettings.errors.child,
        }
      )
      .refine(
        dateString => {
          if (!dateString) {
            return true
          }

          return isValidDateFormat(dateString)
        },
        {
          message: t.profileSettings.errors.dateFormatError,
        }
      )
      .optional()
      .transform(value => (value === '' ? undefined : value)),
    firstName: z
      .string()
      .min(1, t.profileSettings.errors.firstName)
      .max(50, t.profileSettings.invalidNameMax)
      .regex(
        ME_REGEX,
        `${t.profileSettings.invalidName} A-Z; a-z;
А-Я; а-я`
      ),
    lastName: z
      .string()
      .min(1, t.profileSettings.errors.lastName)
      .max(50, t.profileSettings.invalidLastNameMax)
      .regex(
        ME_REGEX,
        `${t.profileSettings.invalidLastName} A-Z; a-z;
А-Я; а-я`
      ),
    username: z
      .string()
      .min(6)
      .max(30)
      .regex(USERNAME_REGEX, `${t.profileSettings.invalidUsername} a-z, A-Z, 0-9_-`),
  })
}
export type ProfileFormSchema = z.infer<ReturnType<typeof profileFormSchema>>
