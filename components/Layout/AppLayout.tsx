import { ReactElement, useState } from 'react';

import Search from '../Search/Search';

const AppLayout = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  const [previousPage, setPreviousPage] = useState('');

  return (
    <div className='bg-CustomBlack min-h-screen relative'>
      <div className='container mx-auto pt-6 px-3 sm:px-0 relative'>
        <Search previousPage={previousPage} />
        <main>{children}</main>
      </div>
    </div>
  );
};
export default AppLayout;
