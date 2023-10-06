import BoardgameImage from "../BoardgameImage";

export default function TableRow({ rowsData }) {
  const tableRows = rowsData.map((data, index) => {
    return (
      <tr key={index} className="border-b dark:border-neutral-500">
        <td className="whitespace-nowrap px-6 py-4">
          {data.image ? <BoardgameImage boardgame={data} size={80} /> : null}
        </td>
        {data.name ? (
          <td className="whitespace-nowrap px-6 py-4">{data.name}</td>
        ) : null}
        {data.price ? (
          <td className="whitespace-nowrap px-6 py-4">
            {data.currency} {data.price}
          </td>
        ) : null}
      </tr>
    );
  });

  return tableRows;
}
