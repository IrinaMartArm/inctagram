import { useEffect } from "react";

import { setAccessToken } from "@/shared/assets/helpers/authentication";
import { HeadMeta, Loader } from "@/shared/components";

const GoogleAuth = () => {
  useEffect(() => {
    const queryString = window.location.search;

    setAccessToken(queryString);
  }, []);

  return (
    <>
      <HeadMeta title={"Google auth"} />
      <Loader />
    </>
  );
};

export default GoogleAuth;
