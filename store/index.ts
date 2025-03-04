import { configureStore } from "@reduxjs/toolkit";
import { peopleApi } from "@/services/peopleApi";

export const store = configureStore({
  reducer: {
    [peopleApi.reducerPath]: peopleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(peopleApi.middleware),
});
