export default function Filters() {
  return (
    <div className="pr-12">
      <div className="flex justify-between">
        <h3 className="font-bold mt-0.5">Filter Sites</h3>
        <div className="px-2 py-0.5 border">Clear</div>
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
    </div>
  );
}
