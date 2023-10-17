'use client';
import React from 'react';

import AudioContextProvider from './AudioContext';
import HistoryProvider from './HistoryContextProvider';
import LikesContextProvider from './LikesContextProvider';
import ReactQueryProvider from './ReactQueryProvider';

type ProviderProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProviderProps) => {
  return (
    <ReactQueryProvider>
      <AudioContextProvider>
        <HistoryProvider>
          <LikesContextProvider>{children}</LikesContextProvider>
        </HistoryProvider>
      </AudioContextProvider>
    </ReactQueryProvider>
  );
};

export default Providers;
