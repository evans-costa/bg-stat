export default function SearchList({ children, isActive }) {
  return (
    <>
      {isActive ? (
        <div className="w-full bg-gray-600 flex flex-col rounded-lg max-h-80 overflow-y-auto">
          {children}
        </div>
      ) : null}
    </>
  );
}
