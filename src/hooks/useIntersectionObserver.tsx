import React, { MutableRefObject, useEffect } from 'react';

type TuseInterSectionObserver<T = MutableRefObject<HTMLImageElement[]>> = (
  ref: T
) => void;

const useInterSectionObserver: TuseInterSectionObserver = (ref) => {
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (
      entries,
      observer
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let image = entry.target as HTMLImageElement;
          image.src = image.dataset.src as string;
          intersectionobserver.unobserve(image);
        }
      });
    };
    const intersectionobserver = new IntersectionObserver(observerCallback, {});
    if (ref.current.length > 0) {
      ref.current.forEach((image) => {
        intersectionobserver.observe(image);
      });
    }

    return () => {
      intersectionobserver.disconnect();
    };
  }, [ref]);
};
export default useInterSectionObserver;
