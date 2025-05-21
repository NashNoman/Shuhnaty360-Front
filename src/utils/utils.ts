import { UrlString } from "../util.types";

export const getUrlParams: Record<string, any> = (url: UrlString) => {
  const urlObj = new URL(url);
  const params: Record<string, any> = {};
  urlObj.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
};
