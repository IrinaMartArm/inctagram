import { LocaleType } from "locales/ru";

export const en: LocaleType = {
  favorites: {
    title: "favorites page",
  },
  general: {
    title: "general page",
  },
  policy: {
    title: "Privacy Policy",
  },
  signIn: {
    errors: {
      email: "The email must match the format\n" + "example@example.com",
      invalidPassword: "Password must contain",
      loginError: "The email or password are\n" + "incorrect. Try again please",
      passwordMax: "Maximum number of characters 20",
      passwordMin: "Minimum number of characters 6",
      required: "Required field",
      unknownError: "Unknown error",
    },
    forgotPassword: "Forgot Password",
    password: "Password",
    question: "Don't have an account?",
    signUp: "Sign Up",
    title: "Sign In",
  },
  signup: {
    1: "Terms of Service",
    2: "Privacy Policy",
    agree: "I agree to the <1></1> and <2></2>",
    name: "Username",
    password: "Password",
    password2: "Password confirmation",
    question: "Do you have an account?",
    signIn: "Sign In",
    title: "Sign Up",
  },
};
