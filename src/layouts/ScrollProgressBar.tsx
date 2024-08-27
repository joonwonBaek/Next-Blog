'use client';

import { useEffect, useState } from 'react';

const ScrollProgressBar = () => {
  const [mounted, setMounted] = useState(false);
  const [scrollTop, setScrillTop] = useState(0);

  const onScroll = () => {
    const winScroll = document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    setScrillTop(scrolled);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="h-1 fixed top-0 w-full">
      <div className="bg-primary h-1" style={{ width: `${scrollTop}%` }}></div>
    </div>
  );
};

export default ScrollProgressBar;
