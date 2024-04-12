import { baseQueryWithReauth } from "@/shared/assets/api/base-query.reauth";
import { createApi } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  reducerPath: "baseApi",
  tagTypes: ["Me"],
});
