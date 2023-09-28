export default function SearchList({ searchResults }) {
  return (
    <div className="w-full bg-gray-600 flex flex-col rounded-lg mt-4 max-h-80 overflow-y-auto">
      {searchResults}
    </div>
  );
}
