import Link from "next/link";
import Image from "next/image";

import { PlusIcon } from "@heroicons/react/20/solid";

export default function Header() {
  return (
    <header>
      <nav className="bg-gray-900 px-4 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto">
          <Link className="flex items-center gap-2" href="/">
            <Image
              className="w-auto h-auto"
              src="/static/headerIcon.png"
              height={50}
              width={50}
              alt="Header meeple icon"
              priority
            />
            <span className="font-bold text-lg">BG Collection Stat</span>
          </Link>
          <Link
            className="rounded-full text-sm px-3 py-3 items-center bg-gray-700 text-white"
            href="/add"
          >
            <PlusIcon className="h-6 w-6" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
