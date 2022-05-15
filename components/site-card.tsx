import BlurImage from "./blur-image";
import { ExpandingArrow } from "@/components/icons";

export interface SiteProps {
  domainSlug: string;
  thumbnail: string;
  blurDataURL?: string;
}

export default function SiteCard({ site }: { site: SiteProps }) {
  return (
    <div
      key={site.domainSlug}
      className="relative group col-span-1 border border-gray-300 rounded-lg overflow-hidden"
    >
      <BlurImage
        src={site.thumbnail}
        width={600}
        height={350}
        layout="responsive"
        objectFit="cover"
        placeholder="blur"
        blurDataURL={site.blurDataURL}
        className="group-hover:scale-105 transition-all"
      />
      <div className="absolute top-0 mt-16 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900 transition-all" />
      <div className="absolute bottom-0 h-12 w-full flex justify-center">
        <a
          href={`https://${site.domainSlug}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center"
        >
          <p className="text-white font-medium">{site.domainSlug}</p>
          <ExpandingArrow className="h-3 w-3 text-white mt-[0.1rem]" />
        </a>
      </div>
    </div>
  );
}
