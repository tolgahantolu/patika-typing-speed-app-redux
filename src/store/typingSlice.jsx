import { createSlice } from "@reduxjs/toolkit";

const typingSlice = createSlice({
  name: "typing",
  initialState: {
    helloWorld: "Hello World!",
  },
  reducers: {},
});

export default typingSlice.reducer;
