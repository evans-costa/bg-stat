import Link from 'next/link';
import Image from 'next/image';
import ActionMenu from '../ActionMenu';

import { PlusIcon } from '@heroicons/react/20/solid';

import useUser from '../../hooks/useUser';

export default function Header() {
  const { user } = useUser();

  return (
    <header>
      <nav className="bg-gray-900 px-4 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto">
          <Link
            className="flex items-center gap-2"
            href={user ? '/boardgames' : '/'}
          >
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
          {user && (
            <div className="flex items-center gap-4">
              <Link
                className="text-sm px-2 py-2 items-center bg-slate-700 text-slate-400 hover:text-slate-100 rounded-full"
                href="/add"
              >
                <PlusIcon className="h-5 w-5" />
              </Link>
              <ActionMenu />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
