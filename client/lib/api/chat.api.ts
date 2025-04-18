import { api } from './api';

const extendedChatApi = api.injectEndpoints({
    endpoints: (build) => ({
      createChatCompletion: build.mutation<
        {
          choices: {
            message: {
              role: string;
              content: string;
            };
          }[];
        },
        { messages: ChatCompletionMessage[] }
      >({
        query: ({ messages }) => ({
          url: "/openai/chatCompletion",
          method: "POST",
          body: { messages },
        }),
        invalidatesTags: ["Agents"],
      }),
    }),
    overrideExisting: false,
  });
  
  export const { 
    useCreateChatCompletionMutation 
} = extendedChatApi;