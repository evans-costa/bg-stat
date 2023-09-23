import Images from "../Images/images";

export default function TableRow({ rowsData }) {
  const tableRows = rowsData.map((data, index) => {
    return (
      <tr key={index} className="border-b dark:border-neutral-500">
        <td className="whitespace-nowrap px-6 py-4">
          {data ? <Images boardgame={data} size={80} /> : null}
        </td>
        {data ? (
          <td className="whitespace-nowrap px-6 py-4">{data.name}</td>
        ) : null}
      </tr>
    );
  });

  return tableRows;
}
