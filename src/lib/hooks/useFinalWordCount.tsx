import React from "react";

type Props = {
  typedText: string;
  textToType: string;
  remainingTime: number;
};

export const useFinalWordCount = ({
  textToType,
  remainingTime,
  typedText,
}: Props) => {
  if (remainingTime > 0) {
    return {
      validWordCount: null,
      invalidWordCount: null,
      accuracy: null,
    };
  }
  const typpedWords = typedText.split(" ");
  const amountOfTyppedWords = typpedWords.length;
  const words = textToType.split(" ").slice(0, amountOfTyppedWords);

  const validWords = words.filter(
    (x, idx) => x?.toLowerCase() === typpedWords[idx]?.toLowerCase()
  );
  const invalidWords = words.filter(
    (x, idx) => x?.toLowerCase() !== typpedWords[idx]?.toLowerCase()
  );

  return {
    validWordCount: validWords.length,
    invalidWordCount: invalidWords.length,
    accuracy: Math.round((validWords.length / words.length) * 100),
  };
};
