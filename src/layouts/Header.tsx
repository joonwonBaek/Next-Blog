import Link from 'next/link';

import ThemeSwitch from './theme/Switch';

export const Header = () => {
  return (
    <nav className="sticky top-1 z-40 mt-1 flex h-[64px] items-center justify-center border-b bg-background pb-1 shadow-sm">
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
