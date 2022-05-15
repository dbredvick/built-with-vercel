import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";

cloudinary.config({
  cloud_name: "owd-assets",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: false,
});

export async function getSiteOPRank(site: string) {
  const data = await fetch(
    `https://openpagerank.com/api/v1.0/getPageRank?domains[0]=${site}`,
    {
      method: "GET",
      // @ts-expect-error
      headers: {
        "API-OPR": process.env.OPR_API_KEY,
      },
    }
  ).then((res) => res.json());
  const rank =
    data.status_code === 200 && data.response[0].status_code === 200
      ? parseInt(data.response[0].rank)
      : 99999999;
  return rank;
}

export async function updateSiteThumbnail(site: string, id: string) {
  await cloudinary.uploader.upload(
    `https://api.microlink.io/?url=https://${site}&screenshot=true&meta=false&embed=screenshot.url&waitForTimeout=2000`,
    {
      use_filename: true,
      unique_filename: false,
      filename_override: id,
    },
    async function (error, result) {
      console.log(result, error);
      if (result && !error) {
        await prisma.site.update({
          where: { domain: site },
          data: {
            thumbnail: result.secure_url,
          },
        });
      }
    }
  );
}

export async function addSite(site: string) {
  return await prisma.site.upsert({
    where: {
      domain: site,
    },
    update: {},
    create: {
      domain: site,
    },
  });
}
