import { baseQueryWithReauth } from "@/shared/assets/api/baseQueryWithReauth/baseQueryWithReauth";
// import {  } from "@reduxjs/toolkit/query/react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  reducerPath: "baseApi",
  tagTypes: ["Me"],
});

// fetchBaseQuery({
//   baseUrl: "https://instagram-api-dw99.onrender.com/api/",
//   credentials: "include",
// })
