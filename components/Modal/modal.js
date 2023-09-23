import SearchBar from "../SearchBar/searchBar";

export default function Modal({ onClick }) {
  return (
    <div className="absolute top-10 left-0 w-full h-full">
      <div className="container mx-auto max-w-2xl h-[80vh] rounded-3xl bg-gray-800 py-6 px-4">
        <button
          className="rounded-full px-3 py-3 items-center bg-gray-700 text-white"
          onClick={onClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
        <SearchBar />
      </div>
    </div>
  );
}
