import React from "react";
import { useSelector } from "react-redux";

const Results = () => {
  const lang = useSelector((state) => state.typing.lang);
  const time = useSelector((state) => state.typing.time);
  const keyCount = useSelector((state) => state.typing.keyCount);
  const correctWord = useSelector((state) => state.typing.correctWord);
  const incorrectWord = useSelector((state) => state.typing.incorrectWord);

  return (
    <>
      {time === 0 && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-auto p-3 bg-[#fafaf9] rounded-md border-[3px] border-zinc-500">
          <h3 className="capitalize text-2xl font-semibold pb-2 border-b border-zinc-600">
            {lang === "turkish" ? "sonuç" : "result"}
          </h3>
          <div className="pt-2 flex flex-col gap-3">
            <p className="text-lg capitalize flex justify-between items-center">
              <span>{lang === "turkish" ? "tuş vuruşu" : "key stroke"}</span>{" "}
              <span>{keyCount}</span>
            </p>
            <p className="text-lg capitalize flex justify-between items-center">
              <span>{lang === "turkish" ? "doğruluk" : "accuracy"}</span>{" "}
              <span>
                {(
                  (correctWord / (correctWord + incorrectWord) || 0) * 100
                ).toFixed(2)}
                %
              </span>
            </p>
            <p className="text-lg capitalize flex justify-between items-center">
              <span>
                {lang === "turkish" ? "doğru kelime" : "correct word"}
              </span>{" "}
              <span className="text-green-700">{correctWord}</span>
            </p>
            <p className="text-lg capitalize flex justify-between items-center">
              <span>
                {lang === "turkish" ? "yanlış kelime" : "incorrect word"}
              </span>{" "}
              <span className="text-red-700">{incorrectWord}</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Results;
