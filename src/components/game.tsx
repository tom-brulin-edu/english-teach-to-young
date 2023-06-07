"use client";

import { Computer } from "@/components/computer";
import { NUMBER_OF_COMPUTERS } from "@/config";
import { Pause, Play, TimerReset } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCountdown, useUpdateEffect } from "usehooks-ts";

export type ComputerData = {
  id: number;
  infected: boolean;
  destroyed: boolean;
};

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const Game = () => {
  const [infectedIndex, setInfectedIndex] = useState(
    randomInt(0, NUMBER_OF_COMPUTERS - 1)
  );

  const [timerRunning, setTimerRunning] = useState(false);
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 10,
      intervalMs: 1000,
    });

  const handleToggleCountdown = () => {
    if (timerRunning) {
      stopCountdown();
    } else {
      startCountdown();
    }
    setTimerRunning(!timerRunning);
  };

  const handleComputerClick = (index: number) => {
    toast("You clicked computer " + index + "   " + infectedIndex);
    if (infectedIndex < index) {
      toast("It's lower");
    } else if (infectedIndex > index) {
      toast("It's bigger");
    } else {
      toast("You won", {
        type: "success",
      });
    }
  };

  const handleReset = () => {
    setTimerRunning(false);
    resetCountdown();

    setInfectedIndex(randomInt(0, NUMBER_OF_COMPUTERS - 1));
  };

  useUpdateEffect(() => {
    if (count === 0) {
      stopCountdown();
      setTimerRunning(false);
      toast("Game over!");
    }
  }, [count]);

  return (
    <div>
      <div className="fixed left-0 top-0 z-50 bg-white p-2 w-full flex gap-2 items-center">
        <span
          className="cursor-pointer transition hover:opacity-80"
          onClick={handleToggleCountdown}
        >
          {timerRunning ? <Pause /> : <Play />}
        </span>
        <span
          className="cursor-pointer transition hover:opacity-80"
          onClick={handleReset}
        >
          <TimerReset />
        </span>
        <span>{count}</span>
      </div>
      <div className="grid grid-cols-12 gap-6 p-8">
        {[...Array(NUMBER_OF_COMPUTERS)].map((_, i) => (
          <Computer
            key={i}
            id={i}
            infected={i === infectedIndex}
            destroyed={false}
            onClick={() => handleComputerClick(i)}
          />
        ))}
      </div>
    </div>
  );
};
