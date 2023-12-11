import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import lefthomeReducer from "./Component/pages/chat/slice/LeftHomeSlice";

export const store = configureStore({
  reducer: {
    lefthome: lefthomeReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
