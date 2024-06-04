import Link from 'next/link';
import Image from 'next/image';

import { PlusIcon } from '@heroicons/react/20/solid';
import { signOutForm } from '../../../lib/actions';

export default function Header() {
  return (
    <header>
      <nav className="bg-gray-900 px-4 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto">
          <Link className="flex items-center gap-2" href="/boardgames">
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

          <div className="flex items-center gap-4">
            <Link
              className="text-sm px-2 py-2 items-center bg-slate-700 text-slate-400 hover:text-slate-100 rounded-full"
              href="/add"
            >
              <PlusIcon className="h-5 w-5" />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <form action={signOutForm}>
              <button>
                <div>SignOut</div>
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}
