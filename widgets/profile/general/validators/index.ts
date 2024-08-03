import { ABOUT_ME_REGEX, ME_REGEX, USERNAME_REGEX } from '@/entities/auth/model/auth-validation'
import { LocaleType } from '@/locales/ru'
import z from 'zod'

const sixteenYearsAgo = new Date()

sixteenYearsAgo.setFullYear(sixteenYearsAgo.getFullYear() - 13)

export const profileFormSchema = (t: LocaleType) => {
  return z.object({
    aboutMe: z
      .string()
      .max(200, `${t.profileSettings.errors.aboutMe}`)
      .regex(
        ABOUT_ME_REGEX,
        `${t.profileSettings.invalidName} A-Z; a-z;
А-Я; а-я`
      )
      .optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    dateOfBirth: z
      .string()
      .refine(
        dateString => {
          if (!dateString) {
            return true
          }
          const dateOfBirth = new Date(dateString)

          return dateOfBirth <= sixteenYearsAgo
        },
        {
          message: `${t.profileSettings.errors.child}`,
        }
      )
      .optional(),
    firstName: z
      .string()
      .min(1, `${t.profileSettings.errors.firstName}`)
      .max(5, `${t.profileSettings.invalidNameMax}`)
      .regex(
        ME_REGEX,
        `${t.profileSettings.invalidName} A-Z; a-z;
А-Я; а-я`
      ),
    lastName: z
      .string()
      .min(1, t.profileSettings.errors.lastName)
      .max(50, `${t.profileSettings.invalidLastNameMax}`)
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
