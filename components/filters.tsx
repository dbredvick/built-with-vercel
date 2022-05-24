import { useRouter } from "next/router";

const filters = [
  { label: "Software", term: "software" },
  { label: "Ecommerce", term: "ecommerce" },
  { label: "Finance", term: "finance" },
  { label: "Media", term: "media" },
  { label: "Government", term: "government" },
  { label: "Something Else", term: "other" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Filters() {
  const router = useRouter();
  const currTerm = router.query.search;

  const handleClick = (term: string) => {
    router.push(`?search=${term}`, undefined, { shallow: true });
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
            {filters.map((filter) => (
              <div
                key={filter.term}
                onClick={() => handleClick(filter.term)}
                className={classNames(
                  currTerm === filter.term
                    ? "text-gray-800 bg-[#fafafa]"
                    : "text-gray-500 hover:bg-[#fafafa]",
                  "relative p-3 rounded cursor-pointer flex items-start"
                )}
              >
                <div className="flex items-center h-5 pl-1">
                  <input
                    id={filter.term}
                    aria-describedby={`${filter.term}-description`}
                    name="filter"
                    type="radio"
                    checked={filter.term === currTerm}
                    className="  focus:ring-indigo-500 h-4 w-4 border-gray-300"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor={filter.term} className="">
                    {filter.label}
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
