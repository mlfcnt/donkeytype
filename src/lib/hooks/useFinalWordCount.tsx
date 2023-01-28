type Props = {
  typedText: string;
  textToType: string;
  remainingTime: number;
  totalTime: number;
};

export const useFinalWordCount = ({
  textToType,
  remainingTime,
  typedText,
  totalTime,
}: Props) => {
  if (remainingTime > 0) {
    return {
      validWordCount: null,
      invalidWordCount: null,
      accuracy: null,
      wordsPerMinute: null,
    };
  }
  const typedWords = typedText.split(" ");
  const amountOfTypedWords = typedWords.length;
  const words = textToType.split(" ").slice(0, amountOfTypedWords);

  const validWords = words.filter(
    (x, idx) => x?.toLowerCase() === typedWords[idx]?.toLowerCase()
  );
  const invalidWords = words.filter(
    (x, idx) => x?.toLowerCase() !== typedWords[idx]?.toLowerCase()
  );

  return {
    validWordCount: validWords.length,
    invalidWordCount: invalidWords.length,
    accuracy: Math.round((validWords.length / words.length) * 100),
    wordsPerMinute: Math.round(validWords.length / msToMinutes(totalTime)),
  };
};

export const msToMinutes = (ms: number) => ms / 1000 / 60;
