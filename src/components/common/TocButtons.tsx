'use client';

import { ArrowUpToLine, MessageSquareText } from 'lucide-react';

import { Button } from '../ui/button';

export const ScrollTop = () => {
  const scrollTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <Button variant="outline" size="icon" onClick={scrollTop}>
      <ArrowUpToLine size={16} />
    </Button>
  );
};

export const ScrollToComment = () => {
  const scrollToGiscus = () =>
    document.querySelector('.giscus')?.scrollIntoView();

  return (
    <Button variant="outline" size="icon" onClick={scrollToGiscus}>
      <MessageSquareText size={16} />
    </Button>
  );
};
