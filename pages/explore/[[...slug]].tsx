import Layout from "@/components/layout";
import Filters from "@/components/filters";
import SiteCardGrid from "@/components/site-card-grid";
import { useEffect, useState, useRef } from "react";
import { useIntersectionObserver } from "@/lib/hooks/use-intersection-observer";
import { getSites } from "@/lib/api/site";
import type { GetStaticProps, GetStaticPaths } from "next";
import type { SiteProps } from "@/lib/api/site";
import type { ReactElement } from "react";

interface ExplorePageProps {
  sites: SiteProps[];
}

export default function Explore({ sites }: ExplorePageProps) {
  const [page, setPage] = useState(1);

  const grids: ReactElement[] = [];
  for (let i = 0; i < page; i++) {
    grids.push(<SiteCardGrid key={i} idx={i} sites={sites} />);
  }

  // intersection observer
  const ref = useRef(null);
  const observer = useIntersectionObserver(ref, {
    threshold: 0.1,
  });
  useEffect(() => {
    if (observer?.isIntersecting) {
      setPage((currentPage) => currentPage + 1);
    }
  }, [observer?.isIntersecting]);

  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto my-20 grid grid-cols-4">
        <div className="hidden lg:block lg:col-span-1 sticky top-20 self-start">
          <Filters />
        </div>
        <div className="col-span-4 lg:col-span-3">
          <div className="grid grid-cols-4 gap-3">{grids}</div>
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
> = async () => {
  const sites = await getSites();
  return {
    props: {
      sites,
    },
  };
};
