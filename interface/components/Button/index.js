export default function Button({ onClick, icon }) {
  return (
      <button
        type="button"
        className="rounded-full text-sm px-3 py-3 items-center bg-gray-700 text-white"
        onClick={onClick}
      >
        {icon}
      </button>
  );
}
