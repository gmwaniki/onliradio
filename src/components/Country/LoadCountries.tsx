'use client';
import React, { useEffect, useRef } from 'react';

import { wait } from '../../util/wait';

type LoadCountriesProps = {
  getNext: () => void;
  isFetching: boolean;
  isFetched: boolean;
};

const LoadCountries = ({ getNext, isFetching }: LoadCountriesProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const refIntersecting = useRef<boolean>(false);
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !refIntersecting.current) {
        refIntersecting.current = true;
        getNext();
        wait(1000, () => (refIntersecting.current = false));
      }
    }, options);
    ref.current && observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [getNext, isFetching]);

  return (
    <div ref={ref} className='text-center'>
      {isFetching ? 'Loading...' : null}
    </div>
  );
};

export default LoadCountries;
