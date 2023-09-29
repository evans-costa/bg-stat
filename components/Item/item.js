export default function Item({ result, handleClick }) {
  return (
    <>
      <div className="p-4">
        <button onClick={handleClick}>
          {result.name} {result.year !== null ? `(${result.year})` : null}
        </button>
      </div>
    </>
  );
}
