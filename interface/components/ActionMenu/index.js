import { UserIcon } from '@heroicons/react/24/solid';
import { Menu } from '@headlessui/react';

export default function ActionMenu() {
  return (
    <Menu as="div">
      <div>
        <Menu.Button className="px-3 py-3 w-full bg-slate-700 border-gray-100 rounded-lg">
          <UserIcon className="h-5 w-5" />
        </Menu.Button>
      </div>
    </Menu>
  );
}
