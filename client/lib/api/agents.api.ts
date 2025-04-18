import { api } from "./api";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    runChatAgent: build.mutation({
      query: (payload) => ({
        url: "/chat-agent/run",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Agents"],
    }),

    runMarketAgent: build.mutation({
      query: (payload) => ({
        url: "/market-agent/run",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Agents"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useRunChatAgentMutation,
  useRunMarketAgentMutation,
} = extendedApi;
