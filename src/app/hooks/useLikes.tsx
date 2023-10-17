'use client';
import { useContext } from 'react';

import { LikesContext } from '../providers/LikesContextProvider';

function useLikes<T extends string | null>(
  stationId?: T
): [
  isliked: boolean,
  likedStations: Record<string, string>,
  like: () => void,
  unlike: () => void,
] {
  const [likes, setLikes] = useContext(LikesContext);
  const isliked = stationId && likes[stationId] == '1' ? true : false;

  const like = () => {
    if (!stationId) {
      return;
    }
    setLikes({ ...likes, [stationId]: '1' });
  };
  const unlike = () => {
    if (!stationId) {
      return;
    }

    setLikes({ ...likes, [stationId]: '0' });
  };

  return [isliked, likes, like, unlike];
}

export default useLikes;
