import { ReactNode } from 'react';
import Header from '../Header/Header';

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='min-h-screen bg-CustomWhite relative'>
      <div className='container mx-auto pt-5 px-6 sm:px-0 md:px-6 md:pt-7 grid grid-flow-row gap-10 '>
        <Header />
        <main className='sm:px-6 justify-self-end'>{children}</main>
      </div>
    </div>
  );
};
export default HomeLayout;
