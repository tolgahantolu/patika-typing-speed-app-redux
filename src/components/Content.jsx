import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiRefreshCcw } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  checkWord,
  refresh,
  setKeyCount,
  setTimer,
} from "../store/typingSlice";

const Content = () => {
  const correctWord = useSelector((state) => state.typing.correctWord);
  const incorrectWord = useSelector((state) => state.typing.incorrectWord);
  const words = useSelector((state) => state.typing.words);
  const lang = useSelector((state) => state.typing.lang);
  let time = useSelector((state) => state.typing.time);

  const [typing, setTyping] = useState("");
  const [currentWord, setCurrentWord] = useState(0);
  const [statusWord, setStatusWord] = useState("");
  const dispatch = useDispatch();

  //  !time
  useEffect(() => {
    if (typing.length > 0 && time) {
      let makeIteration = () => {
        if (time > 0) {
          setTimeout(makeIteration, 1000);
        }
        time -= 1;
        time >= 0 && dispatch(setTimer(time));
      };

      setTimeout(makeIteration, 1000);
    }
  }, [time, typing, dispatch]);

  // !handle refresh
  const handleRefresh = () => {
    dispatch(refresh("refresh"));
    setTyping("");
    setCurrentWord(0);
    setStatusWord("");
  };

  // !handleChange
  const handleChange = (e) => {
    dispatch(setKeyCount());
    setStatusWord("next");

    // !get current word
    let word =
      lang === "turkish"
        ? words[currentWord].turkish.toLowerCase()
        : words[currentWord].english.toLowerCase();

    console.log(word);

    // !clear input and check word
    if (e.target.value.includes(" ")) {
      setTyping("");

      if (word.includes(typing) && word.length === typing.length) {
        dispatch(checkWord(true));
        setStatusWord("correct");
        toast.success(
          `${
            lang === "turkish"
              ? `Doğru! 🥳 Toplam doğru sayınız: ${correctWord + 1}`
              : `Correct! 🥳 Total correct word: ${correctWord + 1}`
          }`,
          { theme: "colored" }
        );
      } else {
        dispatch(checkWord(false));
        setStatusWord("incorrect");
        toast.error(
          `${
            lang === "turkish"
              ? `Yanlış! 😢 Toplam yanlış sayınız: ${incorrectWord + 1}`
              : `Incorrect! 😢 Total incorrect word: ${incorrectWord + 1}`
          }`,
          { theme: "colored" }
        );
      }

      if (words.length - 1 === currentWord) {
        dispatch(refresh("newWords"));
        setCurrentWord(0);
      } else setCurrentWord(currentWord + 1);
    } else {
      setTyping(e.target.value);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={1500} />
      <div
        className={`mt-3 w-full h-[200px] bg-[#fafaf9] text-[#1c1d1c] text-2xl border-[3px] border-zinc-500 rounded-md px-3 py-5 flex items-center text-center leading-10 ${
          statusWord === "next" && "bg-gray-300 border-gray-600"
        } ${statusWord === "correct" && "bg-green-400 border-green-800"} ${
          statusWord === "incorrect" && "bg-red-400 border-red-800"
        }`}
      >
        {words
          .map(({ turkish, english }) =>
            lang === "turkish" ? turkish : english
          )
          .join(" ")}
      </div>
      <div className="mt-3 flex justify-center items-center gap-3">
        <input
          type="text"
          className="w-1/2 h-12 focus:outline-none py-2 px-3 rounded-md text-xl"
          disabled={time === 0}
          value={typing}
          onChange={(e) => handleChange(e)}
        />
        <div className="w-16 h-12 text-2xl bg-[#fafaf9] font-medium grid place-items-center rounded-md border-[3px] border-zinc-500">
          {time}
        </div>
        <button
          type="button"
          className="text-2xl font-medium w-16 h-12 bg-[#fafaf9] rounded-md grid place-items-center border-[3px] border-zinc-500"
          onClick={handleRefresh}
        >
          <FiRefreshCcw />
        </button>
      </div>
    </>
  );
};

export default Content;
