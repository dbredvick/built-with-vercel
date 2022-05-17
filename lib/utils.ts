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

export const getBlurDataURL = async (url: string | null) => {
  if (!url) {
    return null;
  }
  const prefix = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/`;
  const suffix = url.split(prefix)[1];
  const response = await fetch(
    `${prefix}w_210,e_blur:5000,q_auto,f_auto/${suffix}`
  );
  const buffer = await response.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");
  return `data:image/png;base64,${base64}`;
};
