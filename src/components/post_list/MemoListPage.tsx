import {
  getAllMemoCount,
  getCategoryDetailList,
  getSortedMemoList,
} from '@/lib/memo';

import CategoryList from './CategoryList';
import PostCard from './PostCard';

interface PostListProps {
  category?: string;
}

const MemoListPage = async ({ category }: PostListProps) => {
  const memoList = await getSortedMemoList(category);
  const categoryList = await getCategoryDetailList();
  const allPostCount = await getAllMemoCount();

  return (
    <section className="max-w-[950px] w-full mx-auto px-4 mt-14">
      <CategoryList
        allPostCount={allPostCount}
        categoryList={categoryList}
        currentCategory={category}
      />
      <section>
        <ul className="grid md:grid-cols-2 grid-cols-1 lg:gap-12 gap-8">
          {memoList.map((memo) => (
            <PostCard key={memo.url + memo.date} post={memo} />
          ))}
        </ul>
      </section>
    </section>
  );
};

export default MemoListPage;
