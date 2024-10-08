'use client';

import { useRouter } from 'next/navigation';

import { CategoryDetail } from '@/config/types';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { CategoryButton } from './CategoryButton';

interface CategoryListProps {
  categoryList: CategoryDetail[];
  allPostCount: number;
  currentCategory?: string;
  currentSection?: string;
}

const CategoryList = ({
  categoryList,
  allPostCount,
  currentCategory = 'all',
  currentSection = 'blog',
}: CategoryListProps) => {
  const router = useRouter();

  const onCategoryChange = (value: string) => {
    if (value === 'all') {
      router.push(`/${currentSection}`);
    } else {
      router.push(`/${currentSection}/${value}`);
    }
  };

  return (
    <>
      <section className="mb-10 hidden sm:block">
        <ul className="flex gap-3">
          <CategoryButton
            href={`/${currentSection}`}
            isCurrent={currentCategory === 'all'}
            displayName="All"
            count={allPostCount}
          />
          {categoryList.map((cg) => (
            <CategoryButton
              key={cg.dirName}
              href={`/${currentSection}/${cg.dirName}`}
              displayName={cg.publicName}
              isCurrent={cg.dirName === currentCategory}
              count={cg.count}
            />
          ))}
        </ul>
      </section>
      <section className="mb-10 sm:hidden">
        <Select onValueChange={onCategoryChange} defaultValue={currentCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All ({allPostCount})</SelectItem>
            {categoryList.map((cg) => (
              <SelectItem key={cg.dirName} value={cg.dirName}>
                {cg.publicName} ({cg.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>
    </>
  );
};

export default CategoryList;
