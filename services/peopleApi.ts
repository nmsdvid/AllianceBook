import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const peopleApi = createApi({
  reducerPath: "peopleApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.py4e.com/api/" }),
  endpoints: (builder) => ({
    getPeople: builder.query({
      query: ({ page = 1 }) => ({
        url: "people",
        params: {
          page,
        },
      }),
      transformResponse: (response) => ({
        people: response.results,
      }),
    }),
  }),
});

export const { useGetPeopleQuery } = peopleApi;
