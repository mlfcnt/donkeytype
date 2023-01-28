import { useEffect, useState } from "react";
import { sanitizeText } from "../lib/helpers";
import { wordsFr } from "./fr";

const getRandomWords = (lang: "fr", count: number, maxWordLength: number) => {
  const words = lang === "fr" ? wordsFr : wordsFr;
  const randomWords = words
    .filter((x) => x.length <= maxWordLength)
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
  return randomWords;
};

export const useSanitizedRandomWords = (
  lang: "fr" = "fr",
  count = 200,
  maxWordLength = 9
) => {
  const [textToType, setTextToType] = useState("");
  useEffect(() => {
    const randomWords = getRandomWords(lang, count, maxWordLength);
    setTextToType(sanitizeText(randomWords.join(" ")));
  }, [count, lang, maxWordLength]);
  return textToType;
};
