"use client";

import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
};
