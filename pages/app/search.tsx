import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import AppLayout from '../../components/Layout/AppLayout';
import { NextPageWithLayout } from '../_app';

const SearchPage: NextPageWithLayout = () => {
  const router = useRouter();
  return <div className='text-CustomWhite'>This is a station page</div>;
};
SearchPage.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
export default SearchPage;
