import { type NextPage } from "next";
import Head from "next/head";
import type { KeyboardEvent } from "react";
import { useState } from "react";
import { allowedKeys } from "../constants";
import { useSanitizedRandomWords } from "../dictionnary/helpers";
import { useFinalWordCount } from "../lib/hooks/useFinalWordCount";
import { useFormatText } from "../lib/hooks/useFormatText";
import { useTimer } from "../lib/hooks/useTimer";

const Home: NextPage = () => {
  const textToType = useSanitizedRandomWords("fr", 50, 7);
  const [typedText, setTypedText] = useState("");
  const { formattedText } = useFormatText({
    textToType,
    typedText,
  });
  const { remainingTime } = useTimer({ typedText, totalTime: 30_000 });
  const { validWordCount, invalidWordCount, accuracy } = useFinalWordCount({
    textToType,
    typedText,
    remainingTime,
  });

  const timeIsUp = remainingTime <= 0;

  const handleKeyUp = (e: KeyboardEvent<HTMLElement>) => {
    if (timeIsUp) return;
    if (allowedKeys.includes(e.key?.toLowerCase()) || e.code === "Space") {
      setTypedText((prev) => prev + e.key);
    }
  };

  return (
    <>
      <Head>
        <title>Donkeytype</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        tabIndex={0}
        onKeyUp={handleKeyUp}
        className="flex max-h-8  min-h-screen flex-col justify-center bg-gray-900 text-gray-100"
      >
        <section className="mx-56 text-3xl">
          <p className="my-8 italic text-yellow-500">{remainingTime / 1000}</p>
          <p className="text-gray-600">{formattedText}</p>
        </section>
        {timeIsUp && (
          <section className="mx-56 mt-16 border-2 border-yellow-500 p-4">
            <h2 className="mb-4 text-3xl underline">Recap</h2>
            <p>Mots valides : {validWordCount}</p>
            <p>Mots invalides : {invalidWordCount}</p>
            <p>Précision : {accuracy}%</p>
          </section>
        )}
      </main>
    </>
  );
};

export default Home;
