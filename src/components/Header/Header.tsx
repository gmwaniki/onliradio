import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const Header = () => {
  const [menu, setMenu] = useState<boolean>(false);
  function handleMenuClick() {
    setMenu(!menu);
  }
  return (
    <>
      <header className=' grid grid-cols-2 sm:text-lg sm:grid-cols-[.5fr_2.5fr]  '>
        <Link href='/'>
          <a>
            <span className='sr-only'>Homepage</span>
            <Image
              src='/images/logo/vector/default-monochrome.svg'
              alt='onliradio logo'
              height='47px'
              width='256px'
              layout='responsive'
            />
          </a>
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
              <Link href='/'>
                <a className='relative transition-all hover:text-black text-slate-500 after:absolute after:h-1 after:w-0 after:bg-gradient after:left-0 after:-bottom-1 after:z-10  after:transition-[width] after:duration-300 hover:after:w-full'>
                  Home
                </a>
              </Link>
            </li>
            <li>
              <Link href='/'>
                <a className='relative transition-all hover:text-black text-slate-500 after:absolute after:h-1 after:w-0 after:bg-gradient after:left-0 after:-bottom-1 after:z-10  after:transition-[width] after:duration-300 hover:after:w-full'>
                  Contact us
                </a>
              </Link>
            </li>
            <li>
              <Link href='/'>
                <a className='relative transition-all hover:text-black text-slate-500 after:absolute after:h-1 after:w-0 after:bg-gradient after:left-0 after:-bottom-1 after:z-10  after:transition-[width] after:duration-300 hover:after:w-full'>
                  Faq
                </a>
              </Link>
            </li>
          </ul>
          <ul className='grid grid-flow-col items-center gap-8'>
            <li>
              <Link href='/app'>
                <a className='bg-gradient text-white py-[10px] px-[30px] rounded-md transition-transform duration-300 hover:opacity-90 '>
                  Listen
                </a>
              </Link>
            </li>
            <li>
              <Link href='/w'>
                <a className='relative transition-all hover:text-black text-slate-500 after:absolute after:h-1 after:w-0 after:bg-gradient after:left-0 after:-bottom-1 after:z-10  after:transition-[width] after:duration-300 hover:after:w-full'>
                  Sign up
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
