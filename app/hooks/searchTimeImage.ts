import { TIMES } from "@/contents/times";

export const searchTimeImage = (eventTime: string): string | undefined =>
  TIMES.find((time) => time.name === eventTime)?.image;
