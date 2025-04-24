// lib/api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query";
import { toast } from "sonner";

const customBaseQuery = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: any) => {
  const baseQuery = fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL });

  try {
    const result: any = await baseQuery(args, api, extraOptions);

    if (result.error) {
      const message = result.error.data?.message || result.error.status || "Unknown error";
      toast.error(`Error: ${message}`);
    } else if ((args as FetchArgs).method !== "GET" && result.data?.message) {
      toast.success(result.data.message);
    }

    return result;
  } catch (error: any) {
    return { error: { status: "FETCH_ERROR", error: error.message || "Unknown error" } };
  }
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery,
  tagTypes: ["Projects", "Hackathons", "Agents"],
  endpoints: () => ({}),
});
