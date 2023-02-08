'use client';
import React from 'react';

import AudioContextProvider from './AudioContext';
import ReactQueryProvider from './ReactQueryProvider';

type ProviderProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProviderProps) => {
  return (
    <ReactQueryProvider>
      <AudioContextProvider>{children}</AudioContextProvider>
    </ReactQueryProvider>
  );
};

export default Providers;
