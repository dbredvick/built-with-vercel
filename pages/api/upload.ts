import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { parseFile } from "fast-csv";
import { cleanURL } from "@/lib/utils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  parseFile("vercel.csv", { maxRows: 1000 })
    .on("error", (error) => console.error(error))
    .on("data", async (row) => {
      const [domain, _, traffic, ...rest] = row;
      console.log(cleanURL(domain), traffic);
    })
    .on("end", (rowCount: number) => console.log(`Parsed ${rowCount} rows`));
  res.status(200).json({ status: "ok" });
}
