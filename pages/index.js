import Layout from "../components/layout";
import { useEffect, useState } from "react";
import TableRow from "../components/TableRow/tableRow";
import AddButton from "../components/AddButton/addButton";
import Modal from "../components/Modal/modal";

export default function Page() {
  const [rowsData, setRowsData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const query = await fetch(
          "https://www.boardgamegeek.com/xmlapi2/thing?id=320",
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
      <AddButton
        openModal={() => {
          setModalIsOpen(true);
        }}
      />
      {modalIsOpen ? (
        <Modal
          onClick={() => {
            setModalIsOpen(false);
          }}
        />
      ) : null}
      <table className="table-auto min-w-full text-left text-sm font-light">
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
    </Layout>
  );
}
