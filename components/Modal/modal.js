import { useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce.js";

import { XMarkIcon } from "@heroicons/react/24/solid";

import SearchBar from "../SearchBar/searchBar";
import SearchList from "../SearchList/searchList.js";
import BoardgameInfo from "../BoardgameInfo/boardgameInfo.js";
import Item from "../Item/item.js";

export default function Modal({ onClick }) {
  const [results, setResults] = useState([]);
  const [itemId, setItemId] = useState(null);
  const [input, setInput] = useState("");
  const [showResult, setShowResult] = useState(false);
  const debouncedInput = useDebounce({ value: input, delay: 1000 });

  function handleClick(itemId) {
    setItemId(itemId);
    setShowResult(true);
    setInput("");
    setResults([]);
  }

  useEffect(() => {
    const controller = new AbortController();

    const getData = async () => {
      try {
        const query = await fetch(
          `https://www.boardgamegeek.com/xmlapi2/search?query=${debouncedInput}&type=boardgame&exact=0`,
          { signal: controller.signal },
        );
        const response = await query.text();
        let parser = new DOMParser();
        let xml = parser.parseFromString(response, "text/xml");

        const itemElements = xml.getElementsByTagName("item");

        const filteredResults = Array.from(itemElements).map((itemElement) => {
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

    getData();

    return () => controller.abort();
  }, [debouncedInput]);

  return (
    <div className="absolute top-10 left-0 w-full h-full">
      <div className="container mx-auto max-w-2xl h-[80vh] rounded-3xl bg-gray-800 py-6 px-4">
        <button
          className="rounded-full px-3 py-3 items-center bg-gray-700 text-white"
          onClick={onClick}
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <SearchBar
          input={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setShowResult(false)}
        />
        {showResult ? (
          <BoardgameInfo itemId={itemId} />
        ) : (
          <SearchList isActive={input}>
            {results.map((result) => (
              <Item
                result={result}
                key={result.id}
                handleClick={() => handleClick(result.id)}
              />
            ))}
          </SearchList>
        )}
      </div>
    </div>
  );
}
