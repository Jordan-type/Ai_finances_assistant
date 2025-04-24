import { api } from "./api";

const extendedProjectsApi = api.injectEndpoints({
  endpoints: (build) => ({
    createProject: build.mutation({
      query: (projectData) => ({
        url: "/projects",
        method: "POST",
        body: projectData,
      }),
      invalidatesTags: ["Projects"],
    }),

    createHackathon: build.mutation({
      query: (hackathonData) => ({
        url: "/hackathons",
        method: "POST",
        body: hackathonData,
      }),
      invalidatesTags: ["Hackathons"],
    }),

    getProjectById: build.query({
      query: (id: string) => `/projects/${id}`,
      transformResponse: (response: { message: string; data: Project }) => response.data,
      providesTags: (result, error, id) => [{ type: "Projects", id }],
    }),

    getAllProjects: build.query<any, void>({
      query: () => "/projects",
      providesTags: ["Projects"],
    }),

    updateReviewStatus: build.mutation({
      query: ({ project_id, isReviewed }) => ({
        url: "/projects/review",
        method: "PUT",
        body: { project_id, isReviewed },
      }),
      invalidatesTags: ["Projects"],
    }),

    searchProjects: build.mutation({
      query: (query: string) => ({
        url: "/projects/search",
        method: "POST",
        body: { query },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateProjectMutation,
  useCreateHackathonMutation,
  useGetProjectByIdQuery,
  useGetAllProjectsQuery,
  useUpdateReviewStatusMutation,
  useSearchProjectsMutation,
} = extendedProjectsApi;
