'use client';

import Link from 'next/link';

import { useSpy } from '@/hook/useSpy';

import ThemeSwitch from './theme/Switch';

export const Header = () => {
  const height = 63;
  const { ref, marginTop } = useSpy(height);
  return (
    <nav
      style={{ marginTop }}
      ref={ref}
      className="fixed z-40 flex h-[64px] w-full items-center justify-center border-b bg-background shadow-sm">
      <div className="w-full max-w-[1200px] flex justify-between px-4">
        <div className="flex items-center">
          <Link href="/blog">BAEK</Link>
        </div>
        <div>
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
};
