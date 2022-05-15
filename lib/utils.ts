export interface EncodeParams {
  [key: string]: any;
}

export function encode(params: EncodeParams, includeQuestionMark = true) {
  const qs = Object.keys(params)
    // skip null values
    .filter((key) => params[key] != null)
    .map((key) => key + "=" + encodeURIComponent(params[key]))
    .join("&");

  if (!qs.length) return "";
  return includeQuestionMark ? `?${qs}` : `&${qs}`;
}

export const cleanURL = (url: string) => {
  return url
    .replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
    .split("/")[0]
    .split(".") // get the root domain (e.g. "example.com" from "subdomain.example.com")
    .slice(-2)
    .join(".");
};
