/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { Suspense } from 'react';

import Cart from 'components/cart';
import CartIcon from 'components/icons/cart';
import LogoIcon from 'components/icons/logo';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import MobileMenu from './mobile-menu';
import Search from './search';

export default async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <nav className="fixed left-0 right-0 top-0 z-10 flex w-full justify-around bg-cagette from-stop-start to-stop-end py-4 shadow-md backdrop-blur-md">
      <div className="block w-1/3 md:hidden">
        <MobileMenu menu={menu} />
      </div>
      {/* Logo Container */}
      <div className="flex items-center">
        {/* Logo */}
        <Link href="/" aria-label="Go back home">
          <LogoIcon className="h-8 transition-transform hover:scale-110" />
        </Link>
      </div>

      {/* Links Section */}
      <div className="hidden items-center space-x-8 lg:flex">
        {menu.length ? (
          <ul>
            {menu.map((item: Menu) => (
              <li key={item.title}>
                <Link
                  href={item.path}
                  className="flex cursor-pointer text-gray-600 transition-colors duration-300 hover:text-blue-500"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {/* Icon Menu Section */}
      <div className="flex items-center space-x-5">
        {/* Register */}
        <Search />

        {/* Login */}
        <Suspense fallback={<CartIcon className="h-6" />}>
          {/* @ts-expect-error Server Component */}
          <Cart />
        </Suspense>
      </div>
    </nav>
  );
}
