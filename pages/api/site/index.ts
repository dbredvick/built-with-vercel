import { NextApiRequest, NextApiResponse } from "next";
import { cleanURL } from "@/lib/utils";
import { getSites, addSite, getSiteOPRank } from "@/lib/api/site";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { industry, size, page } = req.query as {
      industry: string | null;
      size: string | null;
      page: string | null;
    };
    const response = await getSites(industry, size, page);
    res.status(200).json(response);
  } else if (req.method === "POST") {
    try {
      const { site: rawSite } = req.body;
      const site = cleanURL(rawSite);
      const rank = await getSiteOPRank(site);
      const result = await addSite(site, rank);
      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).end(error);
    }
  } else if (req.method === "PUT") {
    try {
      const { id } = req.query;
      return res.status(200).json(id);
    } catch (error) {
      console.error(error);
      return res.status(500).end(error);
    }
  } else {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
