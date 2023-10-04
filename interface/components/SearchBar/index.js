import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function SearchBar({ keyword, onChange, onFocus }) {
  return (
    <div className="w-4/5 rounded-full h-10 px-4 mx-auto my-10 flex items-center bg-gray-600">
      <MagnifyingGlassIcon className="h-6 w-6" />
      <input
        className="placeholder:italic bg-transparent border-none h-full w-full text-lg ml-1 focus:outline-none"
        type="text"
        id="search"
        name="search"
        placeholder="Digite o nome do jogo..."
        value={keyword}
        onChange={onChange}
        onFocus={onFocus}
      />
    </div>
  );
}
