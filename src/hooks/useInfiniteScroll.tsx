import { useEffect, useRef, useState } from "react";

export const useInfiniteScroll = (
  callback: () => void
): [(node: HTMLDivElement) => void] => {
  const observer = useRef<IntersectionObserver | null>(null);
  const [element, setElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    });

    if (element) observer.current.observe(element);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [element, callback]);

  return [setElement];
};
