"use client";

import { AppProgressBar } from "next-nprogress-bar";

export function ProgressBar() {
  return <AppProgressBar options={{ showSpinner: false }} color="#22d3ee" />;
}
