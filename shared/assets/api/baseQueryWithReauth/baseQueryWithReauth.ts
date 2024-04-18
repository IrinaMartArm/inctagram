import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";

const mutex = new Mutex();
const TOKEN =
  typeof window !== "undefined" && window.localStorage.getItem("accessToken");

const baseQuery = fetchBaseQuery({
  baseUrl: "https://instagram-api-dw99.onrender.com/api/",
  credentials: "include",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      const refreshResult = await baseQuery(
        { method: "POST", url: "v1/auth/refresh-token" },
        api,
        extraOptions,
      );

      if (refreshResult.meta?.response?.status === 204) {
        result = await baseQuery(args, api, extraOptions);
      }
      release();
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};
