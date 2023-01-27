type LetterStatus = "correct" | "wrong" | "not-typed";

export const getTypedLetterStatus = (
  typedText: string,
  textToType: string,
  index: number
): LetterStatus => {
  if (typedText[index] === undefined) return "not-typed";
  if (typedText[index]?.toLowerCase() === textToType[index]) return "correct";
  else return "wrong";
};

export const getColorToApplyFromLetterStatus = (letterStatus: LetterStatus) => {
  switch (letterStatus) {
    case "not-typed":
      return "text-gray-600";
    case "wrong":
      return "text-red-500";
    case "correct":
      return "text-gray-100";

    default:
      return "text-gray-600";
  }
};

export const sanitizeText = (text: string) => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9 ]/g, "");
};
