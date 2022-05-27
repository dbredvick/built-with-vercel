import { IndustryProps } from "@/lib/api/site";
import { useRouter } from "next/router";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Filters({
  categories,
}: {
  categories: IndustryProps[];
}) {
  const router = useRouter();
  const currTerm = router.query.slug;

  const handleClick = (term: string) => {
    router.push(`/${term}`, undefined, { shallow: true });
  };

  const handleClear = () => {
    router.push("/", undefined, { shallow: true });
  };

  return (
    <div className="pr-12">
      <div className="flex justify-between">
        <h3 className="font-bold mt-0.5">Filter Sites</h3>
        <div className="px-2 py-0.5 border" onClick={handleClear}>
          Clear
        </div>
      </div>
      <div className="flex mt-4">
        <div className="flex-1">
          <input
            className="bg-gray-50 p-2 text-gray-400 border-2 border-gray-100 rounded w-full"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="flex-grow border-t border-gray-200 mt-3" />
      <div className="mt-4 space-y-1">
        <fieldset>
          <legend className="my-4 text-sm font-semibold">Industry</legend>
          <div className="space-y-2">
            {categories.map((filter) => (
              <div
                key={filter.slug}
                onClick={() => handleClick(filter.slug)}
                className={classNames(
                  currTerm === filter.slug
                    ? "text-gray-800 bg-[#fafafa]"
                    : "text-gray-500 hover:bg-[#fafafa]",
                  "relative p-3 rounded cursor-pointer flex items-start"
                )}
              >
                <div className="flex items-center h-5 pl-1">
                  <input
                    id={filter.slug}
                    aria-describedby={`${filter.slug}-description`}
                    name="filter"
                    type="radio"
                    checked={filter.slug === currTerm}
                    className="  focus:ring-indigo-500 h-4 w-4 border-gray-300"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor={filter.slug} className="">
                    {filter.name}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </fieldset>
      </div>
    </div>
  );
}
