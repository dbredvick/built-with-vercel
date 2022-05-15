import { NextApiRequest, NextApiResponse } from "next";
import { updateSiteThumbnail } from "@/lib/api/site";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { domainSlug, id } = req.body;

  if (req.method === "PUT") {
    try {
      await updateSiteThumbnail(domainSlug, id);
      return res.status(200).end();
    } catch (error) {
      console.error(error);
      return res.status(500).end(error);
    }
  } else {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
