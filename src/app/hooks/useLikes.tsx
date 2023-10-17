'use client';
import { useContext, useEffect, useState } from 'react';

import { LikesContext } from '../providers/LikesContextProvider';

function useLikes(
  stationId: string = ''
): [
  isliked: boolean,
  likedStations: Record<string, string>,
  like: () => void,
  unlike: () => void,
] {
  const [likes, setLikes] = useContext(LikesContext);
  const [isliked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(stationId && likes[stationId] === '1' ? true : false);
    return () => {
      setIsLiked(false);
    };
  }, [stationId, likes]);

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
