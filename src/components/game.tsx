"use client";

import { Computer } from "@/components/computer";
import { NUMBER_OF_COMPUTERS } from "@/config";
import { Pause, Play, TimerReset } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCountdown, useUpdateEffect } from "usehooks-ts";

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const Game = () => {
  const router = useRouter();
  const [clickedComputers, setClickedComputers] = useState<number[]>([]);
  const [currentBrowsingIndex, setCurrentBrowsingIndex] = useState<number>(-1);
  const [infectedIndex, setInfectedIndex] = useState(
    randomInt(0, NUMBER_OF_COMPUTERS - 1)
  );

  const [timerRunning, setTimerRunning] = useState(false);
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 30,
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
    if (clickedComputers.includes(index) || !timerRunning) return;

    setClickedComputers((prev) => [...prev, index]);

    if (infectedIndex < index) {
      toast("It's lower");
    } else if (infectedIndex > index) {
      toast("It's bigger");
    } else {
      toast("You won", {
        type: "success",
      });
      router.push("/win");
    }
  };

  const handleReset = () => {
    setTimerRunning(false);
    resetCountdown();

    setInfectedIndex(randomInt(0, NUMBER_OF_COMPUTERS - 1));
    setClickedComputers([]);
  };

  const handleAlgo1 = () => {
    let current = 0;
    setClickedComputers((prev) => [...prev, current]);

    const interval = setInterval(() => {
      if (current === NUMBER_OF_COMPUTERS - 1) {
        clearInterval(interval);
        return;
      }

      setCurrentBrowsingIndex(current);
      setClickedComputers((prev) => [...prev, current]);

      if (infectedIndex === current) {
        setTimerRunning(false);
        stopCountdown();
        toast("You won", {
          type: "success",
        });
        clearInterval(interval);
        router.push("/win");
        return;
      }

      current++;
    }, 100);
  };

  const handleAlgo2 = () => {
    console.log("start algo 2");
    let current = (NUMBER_OF_COMPUTERS - 1) / 2;

    const interval = setInterval(() => {
      if (current === NUMBER_OF_COMPUTERS - 1) {
        clearInterval(interval);
        return;
      }

      setCurrentBrowsingIndex(current);
      setClickedComputers((prev) => [...prev, current]);

      if (infectedIndex === current) {
        setTimerRunning(false);
        stopCountdown();
        toast("You won", {
          type: "success",
        });
        clearInterval(interval);
        router.push("/win");
        return;
      }
    }, 500);
  };

  useUpdateEffect(() => {
    if (count === 0) {
      stopCountdown();
      setTimerRunning(false);
      toast("Game over!");
      router.push("/gameover");
    }
  }, [count]);

  return (
    <div>
      <div className="fixed left-0 top-0 z-50 bg-white p-2 w-full flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
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
        <div className="flex items-center gap-4">
          <span
            className="cursor-pointer transition hover:opacity-80"
            onClick={handleAlgo1}
          >
            Algo 1
          </span>

          <span
            className="cursor-pointer transition hover:opacity-80"
            onClick={handleAlgo2}
          >
            Algo 2
          </span>
        </div>
      </div>
      {infectedIndex}
      <div className="grid grid-cols-12 gap-6 p-8">
        {[...Array(NUMBER_OF_COMPUTERS)].map((_, i) => (
          <Computer
            key={i}
            id={i}
            infected={i === infectedIndex}
            destroyed={false}
            hasBeenClicked={clickedComputers.includes(i)}
            browsing={currentBrowsingIndex === i}
            onClick={() => handleComputerClick(i)}
          />
        ))}
      </div>
    </div>
  );
};
