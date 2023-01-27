import { useEffect, useState } from "react";
const TOTAL_TIME = 30_000;

type Props = {
  typedText: string;
  totalTime?: number;
};

export const useTimer = ({ typedText, totalTime = TOTAL_TIME }: Props) => {
  const [remainingTime, setRemainingTime] = useState(totalTime);
  const removeOneSecondFromTimer = () =>
    setRemainingTime((prev) => prev - 1000);

  useEffect(() => {
    if (remainingTime <= 0) {
      setRemainingTime(0);
      return;
    }

    const interval = setInterval(removeOneSecondFromTimer, 1000);
    return () => clearInterval(interval);
  }, [remainingTime, totalTime]);

  if (!typedText)
    return {
      remainingTime: totalTime,
    };

  return { remainingTime };
};
