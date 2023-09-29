import { PlusIcon } from "@heroicons/react/20/solid";

export default function AddButton({ openModal }) {
  return (
    <div className="flex flex-row-reverse my-6">
      <button
        type="button"
        className="rounded-full text-sm px-3 py-3 items-center bg-gray-700 text-white"
        onClick={openModal}
      >
        <PlusIcon className="h-6 w-6" />
      </button>
    </div>
  );
}
