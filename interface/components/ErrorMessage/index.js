import { InformationCircleIcon } from "@heroicons/react/24/solid";

export default function ErrorMessage({ message }) {
  return (
    <div className="text-red-500 font-normal flex items-center gap-1 text-xl mb-4">
      <InformationCircleIcon className="h-6 w-6" /> {message}
    </div>
  );
}
