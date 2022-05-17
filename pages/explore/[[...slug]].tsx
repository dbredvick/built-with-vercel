import Layout from "@/components/layout";
import Filters from "@/components/filters";
import SiteCard from "@/components/site-card";
import useSWRInfinite from "swr/infinite";
import { useEffect, useMemo, useRef } from "react";
import fetcher from "@/lib/fetcher";
import { useIntersectionObserver } from "@/lib/hooks/use-intersection-observer";
import { getSites } from "@/lib/api/site";
import type { GetStaticProps, GetStaticPaths } from "next";
import type { SiteProps } from "@/lib/api/site";

interface ExplorePageProps {
  sites: SiteProps[][];
}

export default function Explore({ sites }: ExplorePageProps) {
  const {
    data: rawData,
    size,
    setSize,
  } = useSWRInfinite<SiteProps[]>(
    (index) => `/api/site?page=${index + 1}`,
    fetcher,
    {
      fallbackData: sites,
      keepPreviousData: true,
    }
  );

  const data = useMemo<SiteProps[]>(() => {
    return rawData
      ? ([] as SiteProps[]).concat(...rawData)
      : ([] as SiteProps[]);
  }, [rawData]);

  // intersection observer
  const ref = useRef(null);
  const observer = useIntersectionObserver(ref, {
    threshold: 0.1,
    rootMargin: "2000px 0px 2000px 0px",
  });
  useEffect(() => {
    if (observer?.isIntersecting) {
      void setSize(size + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [observer?.isIntersecting]);

  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto my-20 grid grid-cols-4">
        <div className="hidden lg:block lg:col-span-1 sticky top-20 self-start">
          <Filters />
        </div>
        <div className="col-span-4 lg:col-span-3 grid grid-cols-4 gap-3">
          {data.map((site) => (
            <SiteCard key={site.id} site={site} />
          ))}
          <div ref={ref} />
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          slug: [],
        },
      },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  ExplorePageProps,
  { slug: string[] }
> = async (context) => {
  const data = await getSites();
  return {
    props: {
      sites: [data],
    },
  };
};
