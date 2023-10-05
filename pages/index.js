import Head from "next/head";
import { useEffect, useState } from "react";

import Layout from "../interface/components/layout";
import TableRow from "../interface/components/TableRow";

export default function Home() {
  const [rowsData, setRowsData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const query = await fetch(
          "https://boardgamegeek.com/xmlapi2/thing?id=320",
        );
        const response = await query.text();
        let parser = new DOMParser();
        let xml = parser.parseFromString(response, "application/xml");

        const rows = {
          name: xml.getElementsByTagName("name")[1].getAttribute("value"),
          image: xml.getElementsByTagName("image")[0].textContent,
        };

        setRowsData([...rowsData, rows]);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    getData();
  }, []);

  return (
    <Layout>
      <Head>
        <title>BG Collection Stat</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-full flex items-center justify-center mt-12">
        <table className="table-auto min-w-4/5 text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4">
                Imagem (BGG Link)
              </th>
              <th scope="col" className="px-6 py-4">
                Nome do Jogo
              </th>
              <th scope="col" className="px-6 py-4">
                Preço de aquisição
              </th>
            </tr>
          </thead>
          <tbody>
            <TableRow rowsData={rowsData} />
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
