'use client';

import { useEffect, useRef, useState } from 'react';

export const useHeadingObserver = (query: string) => {
  const observer = useRef<IntersectionObserver>();
  const [activeIdList, setActiveIdList] = useState<string[]>([]);
  const [tempId, setTempId] = useState('');

  useEffect(() => {
    const scrollMarginOption = { rootMargin: '-32px 0px -80px 0px' };
    // h2, h3 태그에 같은 text가 있는 경우에 동시에 active가 되는 문제를 해결

    const handleObserver: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        const targetId = `#${entry.target.id}`;
        if (entry.isIntersecting) {
          setActiveIdList((prev) => [...prev, targetId]);
          setTempId(() => '');
        } else {
          setActiveIdList((prev) => {
            if (prev.length === 1) setTempId(targetId);
            return prev.filter((element) => element !== targetId);
          });
        }
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

  return [...activeIdList, tempId];
};
