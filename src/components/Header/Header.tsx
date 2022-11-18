'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import logo from '../../assets/logo.svg';

type TProps = {
  countryCode: string;
};

const Header = ({ countryCode }: TProps) => {
  const [menu, setMenu] = useState<boolean>(false);
  function handleMenuClick() {
    setMenu(!menu);
  }
  return (
    <>
      <header className=' grid grid-cols-2 sm:text-lg sm:grid-cols-[.5fr_2.5fr]  '>
        <Link href='/'>
          <span className='sr-only'>Homepage</span>
          <Image src={logo} alt='onliradio logo' />
        </Link>
        <div className='justify-self-end grid place-items-center sm:hidden'>
          <button onClick={handleMenuClick} className='text-3xl '>
            <span className='sr-only'>Menu</span>
            {menu ? (
              <HiX data-testid='closemenu' />
            ) : (
              <HiMenuAlt3 data-testid='hamburger' />
            )}
          </button>
        </div>
        <nav className='hidden sm:grid sm:grid-cols-[1fr_auto]'>
          <ul className='grid grid-flow-col items-center justify-center gap-8'>
            <li>
              <Link
                href='/'
                className='relative transition-all hover:text-black text-slate-500 after:absolute after:h-1 after:w-0 after:bg-gradient after:left-0 after:-bottom-1 after:z-10  after:transition-[width] after:duration-300 hover:after:w-full'
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href='/'
                className='relative transition-all hover:text-black text-slate-500 after:absolute after:h-1 after:w-0 after:bg-gradient after:left-0 after:-bottom-1 after:z-10  after:transition-[width] after:duration-300 hover:after:w-full'
              >
                Contact us
              </Link>
            </li>
            <li>
              <Link
                href='/'
                className='relative transition-all hover:text-black text-slate-500 after:absolute after:h-1 after:w-0 after:bg-gradient after:left-0 after:-bottom-1 after:z-10  after:transition-[width] after:duration-300 hover:after:w-full'
              >
                Faq
              </Link>
            </li>
          </ul>
          <ul className='grid grid-flow-col items-center gap-8'>
            <li>
              <Link
                href={`/app/${countryCode}`}
                className='bg-gradient text-white py-[10px] px-[30px] rounded-md transition-transform duration-300 hover:opacity-90 '
              >
                Listen
              </Link>
            </li>
            <li>
              <Link
                href='/'
                className='relative transition-all hover:text-black text-slate-500 after:absolute after:h-1 after:w-0 after:bg-gradient after:left-0 after:-bottom-1 after:z-10  after:transition-[width] after:duration-300 hover:after:w-full'
              >
                Sign up
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
