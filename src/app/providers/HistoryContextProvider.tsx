'use client';
import React, { createContext } from 'react';

const HistoryContext = createContext<Record<string, string>>({});

const HistoryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <HistoryContext.Provider value={{}}>{children}</HistoryContext.Provider>
  );
};

export default HistoryProvider;
