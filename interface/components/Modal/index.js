import { useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";

import { XMarkIcon } from "@heroicons/react/24/solid";

import SearchBar from "../SearchBar";
import SearchList from "../SearchList";
import BoardgameInfo from "../BoardgameInfo";
import SearchItem from "../SearchItem";
import ErrorMessage from "../ErrorMessage";
import LoadingSpin from "../LoadingSpin";
import Button from "../Button";

export default function Modal({ onClick }) {
  const [results, setResults] = useState([]);
  const [itemId, setItemId] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const debouncedInput = useDebounce({ value: keyword, delay: 1000 });

  function handleClick(itemId) {
    setItemId(itemId);
    setKeyword("");
    setResults([]);
  }

  useEffect(() => {
    const controller = new AbortController();

    const getData = async () => {
      setIsLoading(true);
      setResults([]);
      setError(null);

      try {
        const query = await fetch(
          `https://boardgamegeek.com/xmlapi2/search?query=${debouncedInput}&type=boardgame&exact=0`,
          { signal: controller.signal },
        );
        const response = await query.text();

        let parser = new DOMParser();
        let xml = parser.parseFromString(response, "text/xml");

        const itemElements = xml.getElementsByTagName("item");

        if (itemElements.length === 0) {
          setError("No results to be shown!");
          return;
        }

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
        setError("An error ocurred while fetching data.");
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (debouncedInput) getData();

    return () => controller.abort();
  }, [debouncedInput]);

  return (
    <div className="absolute top-10 left-0 w-full h-fit">
      <div className="container flex flex-col items-center mx-auto max-w-2xl h-[80vh] rounded-3xl bg-gray-800 py-6 px-4">
        <div className="self-end mr-10 my-4">
          <Button onClick={onClick} icon={<XMarkIcon className="h-6 w-6" />} />
        </div>
        <SearchBar
          keyword={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={() => {
            setItemId(null);
            setError(null);
          }}
        />
        {isLoading && <LoadingSpin />}
        {error && <ErrorMessage message={error} />}
        <SearchList isActive={debouncedInput}>
          {results.map((result, index) => (
            <SearchItem
              result={result}
              key={index}
              handleClick={() => handleClick(result.id)}
            />
          ))}
        </SearchList>
        {itemId ? <BoardgameInfo itemId={itemId} /> : null}
      </div>
    </div>
  );
}
