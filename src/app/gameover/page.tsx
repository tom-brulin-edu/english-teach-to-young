import { TryAgain } from "@/components/try-again";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <Image src="/bluescreen.jpg" fill alt="bluescreen" />
      <TryAgain />
    </>
  );
}
