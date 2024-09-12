import {
  getAllPostCount,
  getCategoryDetailList,
  getSortedPostList,
} from '@/lib/post';

import CategoryList from './CategoryList';
import PostCard from './PostCard';

interface PostListProps {
  category?: string;
}

const PostListPage = async ({ category }: PostListProps) => {
  const postList = await getSortedPostList(category);
  const categoryList = await getCategoryDetailList();
  const allPostCount = await getAllPostCount();

  return (
    <section className="max-w-[950px] w-full mx-auto px-4 mt-14">
      <CategoryList
        allPostCount={allPostCount}
        categoryList={categoryList}
        currentCategory={category}
      />
      <section>
        <ul className="grid md:grid-cols-2 grid-cols-1 lg:gap-12 gap-8">
          {postList.map((post) => (
            <PostCard key={post.url + post.date} post={post} />
          ))}
        </ul>
      </section>
    </section>
  );
};

export default PostListPage;
