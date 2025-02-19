import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./reducers/quizReducer";

const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
