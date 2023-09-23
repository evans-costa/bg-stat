import { useState } from "react";

export default function SearchBar() {
  const [input, setInput] = useState("");

  const getData = async (value) => {
    console.log(value);
    try {
      const query = await fetch(
        `https://www.boardgamegeek.com/xmlapi2/search?query=${value}`,
      );
      const response = await query.text();
      let parser = new DOMParser();
      let xml = parser.parseFromString(response, "text/xml");

      const nameElements = xml.getElementsByTagName("name");

      for (let i = 0; i < nameElements.length; i++) {
        nameElements[i].getAttribute("value");
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    getData(value);
  };

  return (
    <div className="w-4/5 rounded-full h-10 px-4 mx-auto my-10 flex items-center bg-gray-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path
          fillRule="evenodd"
          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
          clipRule="evenodd"
        />
      </svg>
      <input
        className="placeholder:italic bg-transparent border-none h-full w-full text-lg ml-1 focus:outline-none"
        placeholder="Digite o nome do jogo..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}
