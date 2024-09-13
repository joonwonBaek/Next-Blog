'use client';

import { useEffect, useRef, useState } from 'react';

export const useHeadingObserver = (query: string) => {
  const observer = useRef<IntersectionObserver>();
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const scrollMarginOption = { rootMargin: '-10% 0% -35% 0px' };

    const handleObserver: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveId(entry.target.id);
      });
    };

    observer.current = new IntersectionObserver(
      handleObserver,
      scrollMarginOption,
    );

    const elements = document.querySelectorAll(query);
    elements.forEach((element) => observer.current?.observe(element));

    return () => observer.current?.disconnect();
  }, [query]);

  return activeId;
};
