import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import { getBlurDataURL } from "@/lib/utils";
import mql from "@microlink/mql";

const PAGINATION_LIMIT = 20;

export interface SiteProps {
  id: string;
  domain: string;
  thumbnail: string;
  blurDataURL: string;
}

export async function getSites(
  industry?: string | null,
  size?: string | null,
  page?: string | null
) {
  const sites = await prisma.site.findMany({
    where: {
      NOT: {
        thumbnail: null,
      },
    },
    select: {
      id: true,
      domain: true,
      thumbnail: true,
    },
    orderBy: {
      opr: "asc",
    },
    take: PAGINATION_LIMIT,
    skip: page ? PAGINATION_LIMIT * (parseInt(page) - 1) : 0,
  });
  return (await Promise.all(
    sites.map(async (site) => ({
      ...site,
      blurDataURL: await getBlurDataURL(site.thumbnail),
    }))
  )) as SiteProps[];
}

export async function addSite(site: string, rank: number) {
  return await prisma.site.upsert({
    where: {
      domain: site,
    },
    update: { opr: rank },
    create: {
      domain: site,
      opr: rank,
    },
  });
}

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
  console.log(data);
  const rank =
    data.status_code === 200 && data.response[0].status_code === 200
      ? parseInt(data.response[0].rank)
      : 99999999;
  return rank;
}

export async function getScreenshot(url: string) {
  const { data } = await mql(`https://${url}`, {
    apiKey: process.env.MICROLINK_API_KEY,
    screenshot: true,
    force: true,
  });
  return data.screenshot?.url;
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: false,
});

export async function updateSiteThumbnail(screenshot: string, id: string) {
  await cloudinary.uploader.upload(
    screenshot,
    {
      use_filename: true,
      unique_filename: false,
      filename_override: id,
    },
    async function (error, result) {
      if (result && !error) {
        await prisma.site.update({
          where: { id },
          data: { thumbnail: result.secure_url },
        });
      }
    }
  );
}
