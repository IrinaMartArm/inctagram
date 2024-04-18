import { baseQueryWithReauth } from "@/shared/assets/api/baseQueryWithReauth/baseQueryWithReauth";
// import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

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
