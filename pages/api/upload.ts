import { NextApiRequest, NextApiResponse } from "next";
import { parseFile } from "fast-csv";
import { cleanURL } from "@/lib/utils";
import {
  getSiteOPRank,
  addSite,
  getScreenshot,
  updateSiteThumbnail,
} from "@/lib/api/site";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  parseFile("vercel.csv", { skipRows: 1, maxRows: 100 })
    .on("error", (error) => console.error(error))
    .on("data", async (row) => {
      const [url, _, traffic, ...rest] = row;
      const domain = cleanURL(url);
      const rank = await getSiteOPRank(domain);
      const result = await addSite(domain, rank);
      const screenshot = await getScreenshot(domain);
      if (screenshot) {
        await updateSiteThumbnail(screenshot, result.id);
        console.log(`Added ${domain}`);
      } else {
        console.log(`Failed to add thumbnail for ${domain}`);
      }
    })
    .on("end", (rowCount: number) => console.log(`Parsed ${rowCount} rows`));
  res.status(200).json({ status: "ok" });
}
