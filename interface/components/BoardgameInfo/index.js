import { useState, useEffect } from "react";
import BoardgameImage from "../BoardgameImage";
import LoadingSpin from "../LoadingSpin";

export default function BoardgameInfo({ itemId }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const query = await fetch(
          `https://boardgamegeek.com/xmlapi2/thing?id=${itemId}`,
        );
        const response = await query.text();
        let parser = new DOMParser();
        let xml = parser.parseFromString(response, "text/xml");

        const designers = Array.from(
          xml.querySelectorAll("link[type=boardgamedesigner]"),
        ).map((designer) => designer.getAttribute("value"));

        const newData = {
          name: xml.getElementsByTagName("name")[0].getAttribute("value"),
          image: xml.getElementsByTagName("image")[0].textContent ?? null,
          year:
            xml
              .getElementsByTagName("yearpublished")[0]
              .getAttribute("value") ?? null,
          description:
            xml.getElementsByTagName("description")[0].textContent ?? null,
          designers: designers ?? null,
        };

        setData(newData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    getData();
  }, [itemId]);

  if (!data) {
    return <LoadingSpin />;
  }

  return (
    <section className="boardgame-info flex flex-row gap-3 justify-between">
      <div className="w-fit">
        <BoardgameImage boardgame={data} size={300} />
      </div>
      <div className="text-slate-200 flex flex-col gap-2 items-center w-3/5">
        <div className="text-2xl text-center font-bold flex flex-col gap-2 items-center">
          {data.name}
          <div className="text-lg font-medium">({data.year})</div>
          <a
            href={`http://boardgamegeek.com/boardgame/${itemId}`}
            className="text-xs flex items-center gap-1 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-gray-100"
            target="_blank"
            rel="nofollow noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="19"
              viewBox="0 0 80 38"
              className="inline fill-current"
            >
              <g>
                <path d="M41.6414127,20.8453307 C41.6414127,20.7138507 41.5623149,20.5562773 41.377073,20.5562773 L37.2504649,20.5562773 L37.2504649,24.470024 L41.377073,24.470024 C41.5623149,24.470024 41.6414127,24.338544 41.6414127,24.2073173 L41.6414127,20.8453307 Z M41.6414127,13.911344 C41.6414127,13.779864 41.5623149,13.622544 41.377073,13.622544 L37.2504649,13.622544 L37.2504649,17.2996773 L41.377073,17.2996773 C41.5623149,17.2996773 41.6414127,17.1681973 41.6414127,17.0103707 L41.6414127,13.911344 Z M32.6737649,27.8317573 L32.6737649,10.1032373 L43.6783083,10.1032373 C45.1334524,10.1032373 46.0591517,11.0223307 46.0591517,12.3353573 L46.0591517,16.2754507 C46.0591517,17.483344 45.2656223,18.6390507 43.6257465,19.0332373 C45.2656223,19.4269173 46.1915767,20.530184 46.1915767,21.7122373 L46.1915767,25.5730373 C46.1915767,26.9648507 45.2656223,27.8317573 43.8107333,27.8317573 L32.6737649,27.8317573 Z M57.7535044,16.9530667 L62.7609046,16.9530667 L62.7609046,25.8040267 C62.7609046,26.9597333 61.8619965,27.8263867 60.7242641,27.8263867 L51.7828972,27.8263867 C50.64542,27.8263867 49.7194656,26.9597333 49.7194656,25.8040267 L49.7194656,12.09388 C49.7194656,11.01696 50.64542,10.0978667 51.7828972,10.0978667 L62.7609046,10.0978667 L62.7609046,13.9062267 L54.5602501,13.9062267 C54.4280803,13.9062267 54.2959104,14.0374533 54.2959104,14.19528 L54.2959104,23.7031333 C54.2959104,23.8604533 54.4280803,23.9655867 54.5602501,23.9655867 L58.2640678,23.9655867 C58.4490546,23.9655867 58.5549435,23.8604533 58.5549435,23.7031333 L58.5549435,20.7087333 L56.1478193,20.7087333 L57.7535044,16.9530667 Z M74.3228322,16.9530667 L79.3304876,16.9530667 L79.3304876,25.8040267 C79.3304876,26.9597333 78.4313244,27.8263867 77.2938472,27.8263867 L68.3524802,27.8263867 C67.2147479,27.8263867 66.2890486,26.9597333 66.2890486,25.8040267 L66.2890486,12.09388 C66.2890486,11.01696 67.2147479,10.0978667 68.3524802,10.0978667 L79.3304876,10.0978667 L79.3304876,13.9062267 L71.1298332,13.9062267 C70.9976633,13.9062267 70.8652383,14.0374533 70.8652383,14.19528 L70.8652383,23.7031333 C70.8652383,23.8604533 70.9976633,23.9655867 71.1298332,23.9655867 L74.8333957,23.9655867 C75.0186376,23.9655867 75.1245266,23.8604533 75.1245266,23.7031333 L75.1245266,20.7087333 L72.7171472,20.7087333 L74.3228322,16.9530667 Z"></path>
                <polygon
                  fill="#FF5100"
                  points="24.87 7.01 21.107 8.035 24.792 0 .9 8.794 2.206 19.327 0 21.454 6.577 37.93 20.558 32.779 25.418 21.37 23.331 19.358"
                ></polygon>
              </g>
            </svg>
            <span className="text-xs h-3 w-3">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="up-right-from-square"
                className="svg-inline--fa fa-up-right-from-square "
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V32c0-17.7-14.3-32-32-32H352zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"
                ></path>
              </svg>
            </span>
          </a>
        </div>
        <div className="text-slate-300 text-xl flex">
          {data.designers.join(", ")}
        </div>
        <div className="text-base line-clamp-4 text-justify">
          {data.description}
        </div>
        <div className="place-self-start mt-3 w-full">
          <label
            htmlFor="price"
            className="block text-base font-medium text-slate-300 leading-6"
          >
            Purchase price
          </label>
          <div className="rounded-md h-10 relative bg-gray-600">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-slate-200 text-lg">$</span>
            </div>
            <input
              type="text"
              name="price"
              id="price"
              className="placeholder:italic bg-transparent border-none text-lg py-1.5 pl-7 focus:outline-none"
              placeholder="0.00"
            />
            <div className="absolute inset-y-0 right-1 flex items-center">
              <label htmlFor="currency" className="sr-only">
                Currency
              </label>
              <select
                id="currency"
                name="currency"
                className="h-full rounded-md border-0 bg-gray-600 text-lg py-0 pl-2 pr-4 text-gray-200"
              >
                <option>BRL</option>
                <option>USD</option>
                <option>EUR</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
