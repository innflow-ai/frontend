import { headers } from "next/headers";
import {
  EXPERIENCE_HEADER,
  isVariant,
  MEASURE_HEADER,
} from "./marketing-experience";

export async function getMarketingExperience() {
  const requestHeaders = await headers();
  const value = requestHeaders.get(EXPERIENCE_HEADER);
  return {
    variant: isVariant(value) ? value : null,
    measure: requestHeaders.get(MEASURE_HEADER) === "1",
  };
}
