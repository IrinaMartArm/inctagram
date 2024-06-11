import { useEffect } from "react";

import { setAccessToken } from "@/shared/assets/helpers/authentication";
import { HeadMeta, Loader } from "@/shared/components";

const GithubAuth = () => {
  useEffect(() => {
    const queryString = window.location.search;

    setAccessToken(queryString);
  }, []);

  return (
    <>
      <HeadMeta title={"Github auth"} />
      <Loader />
    </>
  );
};

export default GithubAuth;
