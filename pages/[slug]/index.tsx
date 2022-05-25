import Layout from "@/components/layout";
import Filters from "@/components/filters";
import SiteCardGrid from "@/components/site-card-grid";
import { useEffect, useState, useRef } from "react";
import { useIntersectionObserver } from "@/lib/hooks/use-intersection-observer";
import { getSites, getCategories } from "@/lib/api/site";
import type { GetStaticProps, GetStaticPaths } from "next";
import type { SiteProps, IndustryProps } from "@/lib/api/site";
import type { ReactElement } from "react";
import { useRouter } from "next/router";

interface ExplorePageProps {
  sites: SiteProps[];
  categories: IndustryProps[];
}

export default function Explore({ sites, categories }: ExplorePageProps) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  console.log(categories);

  const grids: ReactElement[] = [];
  for (let i = 0; i < page; i++) {
    grids.push(
      <SiteCardGrid
        key={i}
        idx={i}
        sites={sites}
        industrySlug={router.query.slug as string}
      />
    );
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
      <div className="mx-auto">
        <h1 className="text-center text-5xl tracking-tight font-bold text-gray-900 sm:text-6xl md:text-7xl">
          Built with Vercel
        </h1>
        <p className="text-center text-xl text-gray-500 my-8">
          A directory of sites hosted with Vercel, searchable and filterable.
        </p>
      </div>
      <div className="max-w-screen-lg mx-auto my-14 grid grid-cols-4">
        <div className="hidden lg:block lg:col-span-1 sticky top-20 self-start">
          <Filters categories={categories} />
        </div>
        <div className="col-span-4 lg:col-span-3">
          <div className="grid grid-cols-3 gap-3">{grids}</div>
          <div ref={ref} />
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<
  ExplorePageProps,
  { slug: string }
> = async (ctx) => {
  const sites = await getSites(ctx.params?.slug);
  const categories = await getCategories();
  return {
    props: {
      sites,
      categories,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getCategories();

  const paths = categories.map((category) => ({
    params: {
      slug: category.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
