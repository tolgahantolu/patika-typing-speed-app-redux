import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLanguage } from "../store/typingSlice";

const Language = () => {
  const [lang, setLang] = useState("turkish");
  console.log(lang);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLanguage(lang));
  }, [lang]);

  return (
    <select
      name="lang"
      id="lang"
      className="text-[#1c1d1c] rounded-[4px] p-1 focus:outline-none w-[100px]"
      value={lang}
      onChange={(e) => setLang(e.target.value)}
    >
      <option value="turkish">Turkish</option>
      <option value="english">English</option>
    </select>
  );
};

export default Language;
