import { configureStore } from "@reduxjs/toolkit";
import typingSlice from "./typingSlice";

const store = configureStore({
  reducer: {
    typing: typingSlice,
  },
});

export default store;
