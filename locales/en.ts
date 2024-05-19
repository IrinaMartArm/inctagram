import { LocaleType } from "locales/ru";

export const en: LocaleType = {
  common: {
    error: "Error!",
    no: "No",
    yes: "Yes",
  },
  deleteAvatar: {
    text: "Do you really want to delete your profile photo?",
    title: "Delete Photo",
  },
  favorites: {
    title: "favorites page",
  },

  logOut: {
    buttonNo: "No",
    buttonYes: "Yes",
    title: "Log Out",
    warning: "Are you really want to log out of your account",
  },
  passwordRecovery: {
    back: "Back to Sign In",
    createTitle: "Create new password",
    emailError: "User with this email doesn't exist",
    hidden:
      "The link has been sent by email.\n" +
      "If you don’t receive an email send link again",
    rules: "Your password must be between 6 and 20 characters",
    send: "Send Link",
    send2: "Send Link Again",
    text: "Enter your email address and we will send you further instructions",
    title: "Forgot Password",
  },
  policy: {
    title: "Privacy Policy",
  },
  profile: {
    errors: {
      aboutMeMax: "Maximum number of characters 200",
      firstNameMax: "Maximum number of characters 50",
      firstNameMin: "Minimum number of characters 1",
      lastNameMax: "Maximum number of characters 50",
      lastNameMin: "Minimum number of characters 1",
      usernameMax: "Maximum number of characters 30",
      usernameMin: "Minimum number of characters 6",
    },
    followers: "Followers",
    following: "Following",
    general: {
      1: "Privacy Policy",
      child: "A user under 13 cannot create a\n" + "profile. <1></1>",
      fell: "Error! Server is not available!",
      success: "Your settings are saved!",
    },
    publications: "Publications",
    settingsBtn: "Profile Settings",
  },
  profileSettings: {
    general: {
      addPhoto: "Add a Profile photo",
      errors: {
        formatFile: "The format of the uploaded photo must be PNG and JPEG",
        maxSize: "Photo size must be less than 10 MB!",
      },
      savePhoto: "Save",
      selectPhoto: "Select from Computer",
    },
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
  signUp: {
    1: "Terms of Service",
    2: "Privacy Policy",
    agree: "I agree to the <1></1> and <2></2>",
    back: "Back to Sign Up",
    checkbox: "You must agree to the terms and conditions",
    confirm: "Passwords must match",
    confirmed: "Your email has been confirmed",
    congratulations: "Congratulations!",
    created: "The account has been created.",
    emailMin: "String must contain at least 1 character(s)",
    expired: "Email email-verification link expired",
    formEmail: "The email must match the format\n" + "example@example.com",
    haveSent: "We have sent a link to confirm your email to",
    invalidPassword: "Password must contain",
    invalidUsername: "The username must contain",
    name: "Username",
    password: "Password",
    password2: "Password confirmation",
    passwordMax: "Maximum number of characters 20",
    passwordMin: "Minimum number of characters 6",
    question: "Do you have an account?",
    resend: "Resend email-verification link",
    sendAgain:
      "Looks like the email-verification link has expired. Not to worry, we can send the link again",
    service: "Terms of Service",
    signIn: "Sign In",
    title: "Sign Up",
    username: "Maximum number of characters 30",
  },
};
