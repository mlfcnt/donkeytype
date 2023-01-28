import { useEffect, useState } from "react";
import {
  getColorToApplyFromLetterStatus,
  getTypedLetterStatus,
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
          const letterStatus = getTypedLetterStatus(typedText, textToType, idx);
          const isCurrentLetter = idx === typedText.length;
          return (
            <>
              <span
                key={idx}
                className={`${getColorToApplyFromLetterStatus(
                  letterStatus
                )} m-0 p-0 ${isCurrentLetter ? "animate-pulse" : ""} `}
              >
                {x}
              </span>
            </>
          );
        })}
      </span>
    );
    setFormattedText(formatted);
  }, [textToType, typedText]);
  return { formattedText };
};
