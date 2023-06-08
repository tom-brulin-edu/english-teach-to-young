"use client";

import Confetti from "react-confetti";
import { useScreen } from "usehooks-ts";

export default function Page() {
  const screen = useScreen();

  return (
    <>
      <h1 className={"text-green-500 text-9xl text-center m-auto"}>You Won</h1>
      <Confetti width={screen?.width} height={screen?.height} />
    </>
  );
}
