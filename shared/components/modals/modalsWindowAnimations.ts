import { MotionProps } from 'framer-motion'

const overlay = {
  animate: 'open',
  exit: 'closed',
  initial: 'closed',
  transition: { opacity: { duration: 0.25 } },
  variants: { closed: { opacity: 0 }, open: { opacity: 1 } },
} satisfies MotionProps

const window = {
  animate: 'open',
  exit: 'closed',
  initial: 'closed',
  transition: { opacity: { duration: 0.25 } },
  variants: {
    closed: { opacity: 0, scale: 0.8 },
    open: { opacity: 1, scale: 1 },
  },
} satisfies MotionProps

export const modalAnimations = { overlay, window }
