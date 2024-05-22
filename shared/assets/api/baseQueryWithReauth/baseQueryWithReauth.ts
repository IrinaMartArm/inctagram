import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: "https://inctagram.org/api/",
  credentials: "include",
  prepareHeaders: (headers) => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
    }

    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  await mutex.waitForUnlock();

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQuery(
          {
            method: "POST",
            url: "v1/auth/refresh-token",
          },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          const data = refreshResult.data as { accessToken: string };

          localStorage.setItem("accessToken", data.accessToken);
        }

        if (refreshResult.meta?.response?.status === 200) {
          result = await baseQuery(args, api, extraOptions);
        } else {
          const accessToken = localStorage.getItem("accessToken");

          accessToken &&
            (await baseQuery(
              {
                method: "POST",
                url: "auth/logout",
              },
              api,
              extraOptions,
            ));
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};
