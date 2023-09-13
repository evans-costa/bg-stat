import Layout from "../components/layout";
import { useEffect, useState } from "react";

export default function Page() {
  const [bgInfo, setBgInfo] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const query = await fetch(
        "https://www.boardgamegeek.com/xmlapi2/thing?id=013",
      );
      const response = await query.text();
      let parser = new DOMParser();
      let xml = parser.parseFromString(response, "application/xml");

      const name = xml.getElementsByTagName("name")[1].getAttribute("value");
      const image = xml.getElementsByTagName("image")[0].textContent;

      setBgInfo({ name, image });
    };
    getData();
  }, []);

  return (
    <Layout>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Imagem (BGG Link)</th>
            <th>Nome do Jogo</th>
            <th>Preço de aquisição</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {bgInfo.image ? <img src={bgInfo.image} alt="Imagem" /> : null}
            </td>
            {bgInfo.name ? <td>{bgInfo.name}</td> : null}
            <td>1961</td>
          </tr>
          <tr>
            <td>Witchy Woman</td>
            <td>The Eagles</td>
            <td>1972</td>
          </tr>
          <tr>
            <td>Shining Star</td>
            <td>Earth, Wind, and Fire</td>
            <td>1975</td>
          </tr>
        </tbody>
      </table>
    </Layout>
  );
}
