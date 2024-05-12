import { useEffect } from "react";

import { Loader } from "@/shared/components";

const GoogleAuth = () => {
  useEffect(() => {
    const queryString = window.location.search;

    // Get the accessToken parameter from the query string
    const urlParams = new URLSearchParams(queryString);
    const accessToken = urlParams.get("access-token");

    // If accessToken exists, you can use it
    if (accessToken) {
      console.log("Access Token:", accessToken);
      // Do something with the accessToken
      localStorage.setItem("accessToken", accessToken);
    } else {
      console.log("Access Token not found in the URL");
    }
  }, []);

  return (
    <>
      <Loader />
    </>
  );
};

export default GoogleAuth;
