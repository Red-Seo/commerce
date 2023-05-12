import Link from 'next/link';
import { Suspense } from 'react';

import Cart from 'components/cart';
import CartIcon from 'components/icons/cart';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';

export default async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <header
      aria-label="Site Header"
      className="fixed left-0 right-0 top-0 z-50 flex h-32 w-full bg-cagette from-stop-start to-stop-end p-4 dark:bg-black lg:px-6"
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link className="block text-teal-600" href="/">
              <span className="sr-only">Home</span>
              <img
                src="https://www.cagettebkk.com/wp-content/uploads/2022/06/logo-main.png"
                alt=""
                className="h-24 "
              />
            </Link>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Site Nav">
              {' '}
              {menu.length ? (
                <ul className="flex items-center gap-6 text-sm">
                  {menu.map((item: Menu) => (
                    <li key={item.title}>
                      <Link
                        href={item.path}
                        className="rounded-lg px-2 py-1 text-2xl uppercase text-dark hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <a
                className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                href="/"
              >
                Login
              </a>

              <div className="hidden sm:flex">
                <Suspense fallback={<CartIcon className="h-6" />}>
                  {/* @ts-expect-error Server Component */}
                  <Cart />
                </Suspense>
              </div>

              <div className="block md:hidden">
                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
