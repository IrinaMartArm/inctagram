import { useEffect } from "react";

import { Paths } from "@/shared/assets";
import { setAccessToken } from "@/shared/assets/helpers/authentication";
import { HeadMeta, Loader } from "@/shared/components";
import { useRouter } from "next/router";

const GoogleAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const queryString = window.location.search;

    if (queryString) {
      setAccessToken(queryString);
      router.push(Paths.PROFILE);
    } else {
      console.error("Token not found in URL");
    }
  }, [router]);

  return (
    <>
      <HeadMeta title={"Google auth"} />
      <Loader />
    </>
  );
};

export default GoogleAuth;
