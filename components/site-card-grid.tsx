import SiteCard from "./site-card";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { PAGINATION_LIMIT } from "@/lib/constants";
import type { SiteProps } from "@/lib/api/site";
import type { ReactElement } from "react";

export default function SiteCardGrid({
  idx,
  sites,
}: {
  idx: number;
  sites: SiteProps[];
}) {
  const fallbackData = sites.slice(
    idx * PAGINATION_LIMIT,
    idx * PAGINATION_LIMIT + PAGINATION_LIMIT
  );
  const { data } = useSWR<SiteProps[]>(`/api/site?page=${idx}`, fetcher, {
    fallbackData: fallbackData,
    keepPreviousData: true,
  });

  return data?.map((site) => (
    <SiteCard key={site.id} site={site} />
  )) as unknown as ReactElement;
}
