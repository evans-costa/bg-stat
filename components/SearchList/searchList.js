export default function SearchList({ children, isActive = false }) {
  return (
    <>
      {isActive ? (
        <div className="w-full bg-gray-600 flex flex-col rounded-lg mt-4 max-h-80 overflow-y-auto">
          {children}
        </div>
      ) : (
        <div>Faça sua busca</div>
      )}
    </>
  );
}
