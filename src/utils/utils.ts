import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { UrlString } from "../util.types";

export const getUrlParams = (url: UrlString | null): Record<string, any> => {
  if (!url) return {};

  const urlObj = new URL(url);
  const params: Record<string, any> = {};
  urlObj.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
