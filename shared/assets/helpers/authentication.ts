export const googleAuthRedirect = () =>
  window.location.assign("http://localhost:5000/api/v1/auth/google/login");

export const githubAuthRedirect = () =>
  window.location.assign("http://localhost:5000/api/v1/auth/github/login");
