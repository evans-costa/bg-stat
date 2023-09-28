import { useState, useEffect } from "react";
import Images from "../Images/images";

export default function BoardgameInfo({ itemId }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const query = await fetch(
          `https://www.boardgamegeek.com/xmlapi2/thing?id=${itemId}`,
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
    return <div>Loading...</div>;
  }

  return (
    <section className="boardgame-info flex flex-row gap-3 justify-between">
      <div className="w-fit">
        <Images boardgame={data} size={300} />
      </div>
      <div className="text-slate-200 flex flex-col gap-2 items-center w-3/5">
        <div className="text-2xl font-bold">{data.name}</div>
        <div className="text-lg font-medium">({data.year})</div>
        <div className="text-slate-300 text-xl flex">
          {data.designers.join(", ")}
        </div>
        <div className="text-base line-clamp-10">{data.description}</div>
      </div>
    </section>
  );
}
