export const googleAuthRedirect = () =>
  window.location.assign("https://inctagram.org/api/v1/auth/google/login");

export const githubAuthRedirect = () =>
  window.location.assign("https://inctagram.org/api/v1/auth/github/login");

export const setAccessToken = (queryString: string) => {
  // Get the accessToken parameter from the query string
  const urlParams = new URLSearchParams(queryString);
  const accessToken = urlParams.get("access-token");

  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  } else {
    console.error("Access Token not found in the URL");
  }
};
