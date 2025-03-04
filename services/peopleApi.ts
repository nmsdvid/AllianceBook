import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const peopleApi = createApi({
  reducerPath: "peopleApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.py4e.com/api/" }),
  endpoints: (build) => ({
    getPeople: build.infiniteQuery<
      { results: any[]; next: string | null },
      { page: number },
      number
    >({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages, lastPageParam) =>
          lastPage.next ? lastPageParam + 1 : undefined,
      },
      query({ pageParam }) {
        return {
          url: "people",
          params: { page: pageParam },
        };
      },
    }),
  }),
});

export const { useGetPeopleInfiniteQuery } = peopleApi;
