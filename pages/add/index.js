import { useState, useEffect } from "react";
import useDebounce from "../../interface/hooks/useDebounce.js";

import { searchGameData } from "../../interface/utils/searchGameData.js";

import Layout from "../../interface/components/layout.js";
import SearchBar from "../../interface/components/SearchBar";
import SearchList from "../../interface/components/SearchList";
import BoardgameInfo from "../../interface/components/BoardgameInfo";
import SearchItem from "../../interface/components/SearchItem";
import ErrorMessage from "../../interface/components/ErrorMessage";
import LoadingSpin from "../../interface/components/LoadingSpin";

export default function Add() {
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
        const searchResult = await searchGameData(debouncedInput, controller);
        setResults(searchResult);
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
    <Layout>
      <div className="container flex flex-col items-center mt-8 mx-auto w-2/5 h-fit rounded-3xl bg-gray-800 py-10 px-4">
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
    </Layout>
  );
}
