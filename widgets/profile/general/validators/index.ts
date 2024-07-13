import { ABOUT_ME_REGEX, ME_REGEX, USERNAME_REGEX } from '@/entities/auth/model/auth-validation'
import z from 'zod'

const sixteenYearsAgo = new Date()

sixteenYearsAgo.setFullYear(sixteenYearsAgo.getFullYear() - 16)

export const profileFormSchema = (t: any) =>
  z.object({
    aboutMe: z.string().regex(ABOUT_ME_REGEX).max(200, t.errors.aboutMe).optional(),
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
          message: t.errors.child,
        }
      )
      .optional(),
    firstName: z
      .string()
      .min(1, t.errors.firstName)
      .max(50)
      .regex(
        ME_REGEX,
        `${t.invalidName} A-Z; a-z;
А-Я; а-я`
      ),
    lastName: z
      .string()
      .min(1, t.errors.lastName)
      .max(50)
      .regex(
        ME_REGEX,
        `${t.invalidLastName} A-Z; a-z;
А-Я; а-я`
      ),
    username: z
      .string()
      .min(6)
      .max(30)
      .regex(USERNAME_REGEX, `${t.invalidUsername} a-z, A-Z, 0-9_-`),
  })

export type ProfileFormSchema = z.infer<ReturnType<typeof profileFormSchema>>
