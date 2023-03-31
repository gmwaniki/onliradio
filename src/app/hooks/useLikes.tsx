'use client';
import { useEffect, useMemo, useState } from 'react';

type T1 = {
  isliked: boolean;
  like: (stationId: string) => void;
  unlike: (stationId: string) => void;
};
type T2 = {
  likes: Record<string, string>;
};

type TLikes<T extends string | null> = T extends string ? T1 : T2;

function useLikes<T extends string | null>(stationId?: T): TLikes<T> {
  const getLikes = () => {
    if (!localStorage) return {};
    const likes = localStorage.getItem('likes');
    if (!likes) return null;
    const likedStations: Record<string, string> = JSON.parse(likes);
    return likedStations;
  };

  const [likes, setLikes] = useState<Record<string, string>>({});
  useEffect(() => {
    setLikes(() => {
      const storedLikes = getLikes();
      if (!storedLikes) {
        return {};
      }
      return storedLikes;
    });
  }, []);

  const isliked = useMemo(() => {
    if (stationId && likes && likes[stationId] === '1') return true;
    return false;
  }, [likes, stationId]);

  if (stationId === null) {
    return {
      likes,
    } as TLikes<T>;
  }
  const like = (stationId: string) => {
    // const likedStations = getLikes();
    if (!likes) {
      localStorage.setItem('likes', JSON.stringify({ [stationId]: '1' }));
      return;
    }
    localStorage.setItem(
      'likes',
      JSON.stringify({ ...likes, [stationId]: '1' })
    );
    setLikes({ ...likes, [stationId]: '1' });
  };
  const unlike = (stationId: string) => {
    // const likedStations = getLikes();
    if (!likes) {
      localStorage.setItem('likes', JSON.stringify({ [stationId]: '0' }));
      return;
    }

    localStorage.setItem(
      'likes',
      JSON.stringify({ ...likes, [stationId]: '0' })
    );
    // setLikes((prev) => ({ ...prev, [stationId]: '0' }));
  };

  return { likes, like, unlike, isliked } as TLikes<T>;
  // return {} as TLikes<T>;
}

export default useLikes;
