export const Paths = {
  CONFIRM: "/auth/confirm-email",
  CREATE: "/create",
  FAVORITES: "/favorites",
  FORGOT_PASSWORD: "/auth/create-new-password",
  GITHUB: "/github",
  HOME: "/home",
  LOGIN: "/sign-in",
  LOGOUT: "/logout",
  MAIN: "/",
  MESSENGER: "/messenger",
  POLICY: "/auth/policy",
  PROFILE: "/profile",
  PROFILE_ACCOUNT: "/profile-settings/account",
  PROFILE_DEVICE: "/profile-settings/device",
  PROFILE_GENERAL: "/profile-settings/general",
  PROFILE_PAYMENTS: "/profile-settings/payments",
  PROFILE_SETTINGS: "/profile-settings",
  RECOVERY_PASSWORD: "/auth/password-recovery",
  REGISTRATION: "/sign-up",
  SEARCH: "/search",
  SERVICE: "/auth/terms",
  STATISTIC: "/statistics",
};

export const commonRoutes = [Paths.PROFILE, Paths.MAIN];

export const authRoutes = [
  Paths.LOGIN,
  Paths.REGISTRATION,
  Paths.GITHUB,
  Paths.FORGOT_PASSWORD,
  Paths.CONFIRM,
  Paths.POLICY,
  Paths.LOGOUT,
  Paths.SERVICE,
  Paths.RECOVERY_PASSWORD,
];
