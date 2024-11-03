import Link from 'next/link';

import IconGithub from '@/components/icon/Github';
export const Footer = () => {
  return (
    <footer className="mb-16 mt-20 flex flex-col items-center justify-center gap-4 text-center">
      <div>
        <Link href="https://github.com/joonwonBaek" target="_blank">
          <IconGithub
            className="fill-foreground transition hover:fill-blue-600"
            height={30}
            width={30}
          />
        </Link>
      </div>
      <div>
        © 2024. <span className="font-semibold">Baek</span> all rights reserved
      </div>
    </footer>
  );
};
