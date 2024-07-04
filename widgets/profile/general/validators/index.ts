import z from 'zod'

const sixteenYearsAgo = new Date()

sixteenYearsAgo.setFullYear(sixteenYearsAgo.getFullYear() - 16)

export const profileFormSchema = (t: any) =>
  z.object({
    aboutMe: z.string().max(200, t.errors.aboutMe).optional(),
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
    firstName: z.string().min(1, t.errors.firstName).max(50),
    lastName: z.string().min(1, t.errors.lastName).max(50),
    username: z.string().min(6).max(30),
  })

export type ProfileFormSchema = z.infer<ReturnType<typeof profileFormSchema>>
