import { cn } from "@/core/utils/cn";
import "./globals.css";
import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import { Providers } from "@/app/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Infected",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning suppressContentEditableWarning>
      <body
        className={cn("p-8 relative h-screen w-full bg-black", inter.className)}
      >
        <Providers>
          <div className="absolute h-full w-full top-0 left-0 bg-black opacity-70"></div>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
