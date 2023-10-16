'use client';
import React, { createContext, useState } from 'react';

type TContextValues = [
  Record<string, string>,
  (newLikes: Record<string, string>) => void,
];

export const LikesContext = createContext<TContextValues>([{}, () => {}]);

const LikesContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [likes, setLikes] = useState<Record<string, string>>(() => {
    const likes = localStorage.getItem('likes');
    if (!likes) return {};
    return JSON.parse(likes) as Record<string, string>;
  });
  const handleSetLikes = (newLikes: Record<string, string>) => {
    localStorage.setItem('likes', JSON.stringify(newLikes));
    setLikes(newLikes);
  };

  return (
    <LikesContext.Provider value={[likes, handleSetLikes]}>
      {children}
    </LikesContext.Provider>
  );
};

export default LikesContextProvider;
