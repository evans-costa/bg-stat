import { XCircleIcon } from '@heroicons/react/24/solid';

export default function ErrorMessage({ message }) {
  return (
    <div className="text-red-500 font-medium flex items-center gap-1 text-xl mb-4">
      <XCircleIcon className="h-7 w-7" /> {message}
    </div>
  );
}
