import { useEffect, useState } from "react";
import {
  getColorToApplyFromLetterStatus,
  getTyppedLetterStatus,
} from "../helpers";

type UseFormatText = {
  textToType: string;
  typedText: string;
};

export const useFormatText = ({ textToType, typedText }: UseFormatText) => {
  const [formattedText, setFormattedText] = useState<JSX.Element>(
    <span>{textToType}</span>
  );

  useEffect(() => {
    const formatted = (
      <span>
        {textToType.split("").map((x, idx) => {
          const letterStatus = getTyppedLetterStatus(
            typedText,
            textToType,
            idx
          );
          return (
            <span
              key={idx}
              className={getColorToApplyFromLetterStatus(letterStatus)}
            >
              {x}
            </span>
          );
        })}
      </span>
    );
    setFormattedText(formatted);
  }, [textToType, typedText]);
  return { formattedText };
};
