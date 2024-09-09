'use client';

import { Bolt } from 'lucide-react';
import { useState } from 'react';

import { useOutsideClick } from '@/hook/useOutsideClick';
import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import CopyLinkButton from './CopyLinkButton';
import { ScrollToComment, ScrollTop } from './TocButtons';

const FloatingButton = () => {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => setVisible((prev) => !prev);
  const handleOutsideClick = () => setVisible(false);

  const buttonRef = useOutsideClick<HTMLButtonElement>(handleOutsideClick);

  return (
    <div className="group fixed bottom-6 right-6 xl:hidden">
      <div className="group relative flex flex-col-reverse">
        <Button
          size="icon"
          variant={visible ? 'default' : 'outline'}
          onClick={toggleVisible}
          ref={buttonRef}
          className={cn('absolute bottom-0 right-0 z-10 transition')}>
          <Bolt size={22} />
        </Button>
        <CopyLinkButton
          size={22}
          className={cn(
            'absolute bottom-0 right-0 transition',
            visible && '-translate-y-12',
          )}
        />
        <ScrollToComment
          size={22}
          className={cn(
            'absolute bottom-0 right-0 transition',
            visible && '-translate-y-24',
          )}
        />
        <ScrollTop
          size={22}
          className={cn(
            'absolute bottom-0 right-0 transition',
            visible && '-translate-y-36',
          )}
        />
      </div>
    </div>
  );
};

export default FloatingButton;
