import { useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce.js";
import SearchBar from "../SearchBar/searchBar";
import SearchList from "../SearchList/searchList.js";
import BoardgameInfo from "../BoardgameInfo/boardgameInfo.js";

export default function Modal({ onClick }) {
  const [results, setResults] = useState([]);
  const [itemId, setItemId] = useState(null);
  const [input, setInput] = useState("");
  const [showResult, setShowResult] = useState(false);

  const debouncedInput = useDebounce({ value: input, delay: 1000 });

  useEffect(() => {
    const getData = async () => {
      try {
        const query = await fetch(
          `https://www.boardgamegeek.com/xmlapi2/search?query=${debouncedInput}&type=boardgame&exact=0`,
        );
        const response = await query.text();
        let parser = new DOMParser();
        let xml = parser.parseFromString(response, "text/xml");

        const itemElements = xml.getElementsByTagName("item");

        const filteredResults = Array.from(itemElements)
          .filter((itemElement) => {
            const nameElement = itemElement.getElementsByTagName("name")[0];
            const name = nameElement.getAttribute("value");
            return name.includes(debouncedInput);
          })
          .map((itemElement) => {
            const nameElement = itemElement.getElementsByTagName("name")[0];
            const name = nameElement.getAttribute("value");
            const id = itemElement.getAttribute("id");
            const yearPublished =
              itemElement.getElementsByTagName("yearpublished")[0];
            const year = yearPublished
              ? yearPublished.getAttribute("value")
              : null;

            const boardgameResult = {
              name: name,
              id: id,
              year: year ?? null,
            };

            return boardgameResult;
          });

        setResults(filteredResults);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    if (debouncedInput) getData();
  }, [debouncedInput]);

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
        <SearchBar
          input={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setShowResult(false)}
        />
        {showResult ? (
          <BoardgameInfo itemId={itemId} />
        ) : (
          <SearchList
            searchResults={results.map((result) => {
              return (
                <div className="p-4" key={result.id}>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setItemId(result.id);
                      setShowResult(true);
                      setInput("");
                      setResults([]);
                    }}
                  >
                    {result.name}{" "}
                    {result.year !== null ? `(${result.year})` : null}
                  </div>
                </div>
              );
            })}
          />
        )}
      </div>
    </div>
  );
}
