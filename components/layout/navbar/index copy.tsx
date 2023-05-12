import Link from 'next/link';
import { Suspense } from 'react';

import Cart from 'components/cart';
import CartIcon from 'components/icons/cart';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import MobileMenu from './mobile-menu';
import Search from './search';

export default async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <header aria-label="Site Header" className="border-b border-gray-100">
      <div className="block w-1/3 md:hidden">
        <MobileMenu menu={menu} />
      </div>
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <button type="button" className="p-2 lg:hidden">
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <a href="#" className="flex">
            <span className="sr-only">Logo</span>
            <span className="inline-block h-10 w-32 rounded-lg bg-gray-200"></span>
          </a>
        </div>

        <div className="flex flex-1 items-center justify-end gap-8">
          <nav
            aria-label="Site Nav"
            className="float-left hidden lg:flex lg:gap-4 lg:text-xs lg:font-bold lg:uppercase lg:tracking-wide lg:text-gray-500"
          >
            {menu.length ? (
              <ul className="hidden md:flex">
                {menu.map((item: Menu) => (
                  <li key={item.title}>
                    <Link
                      href={item.path}
                      className="rounded-lg px-2 py-1 text-gray-800 hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </nav>

          <div className="flex items-center">
            <div className="flex items-center border-x border-gray-100">
              <span className="border-e border-e-gray-100">
                <div className="flex w-1/3 justify-end">
                  <span className="hidden sm:block">
                    <Search />
                  </span>
                  <Suspense fallback={<CartIcon className="h-6" />}>
                    {/* @ts-expect-error Server Component */}
                    <Cart />
                  </Suspense>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
