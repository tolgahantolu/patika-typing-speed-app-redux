import { createSlice } from "@reduxjs/toolkit";
import { WORD_LIST } from "../constants";

const shuffle = (arr, count = 30) => {
  let currentIndex = arr.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }

  return arr.slice(0, count);
};

const typingSlice = createSlice({
  name: "typing",
  initialState: {
    words: shuffle(WORD_LIST),
    lang: "",
    time: 20,
    keyCount: 0,
    correctWord: 0,
    incorrectWord: 0,
  },
  reducers: {
    setLanguage: (state, { payload, type }) => {
      state.lang = payload;
    },
    setTimer: (state, { payload, action }) => {
      state.time = payload;
    },
    setKeyCount: (state, { payload, type }) => {
      state.keyCount += 1;
    },
    checkWord: (state, { payload, type }) => {
      if (payload) {
        state.correctWord += 1;
      } else {
        state.incorrectWord += 1;
      }
    },
    refresh: (state, { payload, action }) => {
      if (payload === "refresh") {
        state.words = shuffle(WORD_LIST);
        state.time = 20;
        state.correctWord = 0;
        state.incorrectWord = 0;
        state.keyCount = 0;
      } else {
        state.words = shuffle(WORD_LIST);
      }
    },
  },
});

export const { setLanguage, setTimer, setKeyCount, checkWord, refresh } =
  typingSlice.actions;
export default typingSlice.reducer;
