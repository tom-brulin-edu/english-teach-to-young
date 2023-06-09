"use client";

import { Dead } from "@/components/icons/dead";
import { cn } from "@/core/utils/cn";
import { Check, Cherry, ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  id: number;
  infected: boolean;
  destroyed: boolean;
  hasBeenClicked: boolean;
  bigger: boolean;
  lower: boolean;
  onClick: () => void;
};

export const Computer = ({
  id,
  infected,
  destroyed,
  hasBeenClicked,
  lower,
  bigger,
  onClick,
}: Props) => {
  return (
    <div
      className="relative w-[75px] h-[75px] cursor-pointer"
      onClick={() => {
        if (hasBeenClicked || destroyed) return;
        onClick();
      }}
    >
      <div className="absolute rounded-lg w-full h-[50px] bg-white border-4 border-neutral-500 overflow-hidden">
        {destroyed ? (
          <div
            className={cn(
              "w-full h-full bg-gray-600 flex items-center justify-center text-white"
            )}
          >
            <Cherry />
          </div>
        ) : hasBeenClicked ? (
          <div className="flex items-center justify-center w-full h-full bg-orange-500">
            {infected ? (
              <Check className="text-green-500" />
            ) : lower ? (
              <ChevronLeft className="text-white" />
            ) : bigger ? (
              <ChevronRight className="text-white" />
            ) : (
              <Dead />
            )}
          </div>
        ) : (
          <div
            className={cn(
              "w-full h-full bg-red-600 flex items-center justify-center text-white",
              {
                // "animate-pulse bg-green-500": infected,
              }
            )}
          >
            {id}
          </div>
        )}
      </div>
      <div className="absolute bottom-[10px] left-[25px] h-[15px] w-[25px] bg-neutral-700"></div>
      <div className="absolute bottom-0 left-[12.5px] w-[50px] h-[10px] bg-neutral-500 rounded-t"></div>
    </div>
  );
};
