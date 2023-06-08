"use client";

import { useRouter } from "next/navigation";

export const TryAgain = () => {
  const router = useRouter();
  return (
    <span
      className="cursor-pointer absolute top-2 left-2 text-white font-bold"
      onClick={() => router.push("/")}
    >
      Try again
    </span>
  );
};
