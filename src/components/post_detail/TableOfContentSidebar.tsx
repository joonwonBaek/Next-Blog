'use client';

import Link from 'next/link';

import { HeadingItem } from '@/config/types';
import { useHeadingObserver } from '@/hook/useHeadingObserver';
import { cn } from '@/lib/utils';

import CopyLinkButton from '../common/CopyLinkButton';
import { ScrollToComment, ScrollTop } from '../common/TocButtons';

interface Props {
  toc: HeadingItem[];
}

const TableOfContentSidebar = ({ toc }: Props) => {
  const activeIdList = useHeadingObserver('h2, h3');
  return (
    <aside className="absolute -top-[200px] left-full h-[calc(100%+150px)] -mb-[100px] not-prose hidden xl:block">
      <div className="sticky z-10 top-[200px] w-[200px] bottom-0 mt-[200px] ml-[5rem]">
        <div className="px-4 py-2 border-l mb-4">
          <div className="font-bold mb-1">On this page</div>
          <ul className="text-xs">
            {toc.map((item) => {
              const isH3 = item.indent === 1;
              const isIntersecting = activeIdList.includes(item.link);
              return (
                <li
                  key={item.link}
                  className={cn(
                    isH3 && 'ml-4',
                    isIntersecting && 'font-medium text-blue-600',
                    'py-1 transition',
                  )}>
                  <Link href={item.link}>{item.link}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex gap-2">
          <ScrollTop />
          <ScrollToComment />
          <CopyLinkButton />
        </div>
      </div>
    </aside>
  );
};

export default TableOfContentSidebar;
