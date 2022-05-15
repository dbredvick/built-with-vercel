import { NextApiRequest, NextApiResponse } from "next";
import { cleanURL } from "@/lib/utils";
import { addSite } from "@/lib/api/site";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { site: rawSite } = req.body;
  const site = cleanURL(rawSite);

  if (req.method === "PUT") {
    try {
      await addSite(site);
      return res.status(200).end();
    } catch (error) {
      console.error(error);
      return res.status(500).end(error);
    }
  } else {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
