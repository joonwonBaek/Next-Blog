import Link from 'next/link';

import {
  getCategoryList,
  getCategoryPublicName,
  getPostList,
} from '@/lib/post';

import PostCard from './PostCard';

interface PostListProps {
  category?: string;
}

const PostListPage = async ({ category }: PostListProps) => {
  const postList = await getPostList(category);

  const categoryList = getCategoryList().map((dirName) => ({
    dirName,
    publicName: getCategoryPublicName(dirName),
  }));

  return (
    <section className="max-w-[1200px] w-full mx-auto px-4 mt-14">
      <section className="mb-10">
        <ul className="flex gap-3">
          <li>
            <Link href="/blog" className={!category ? 'text-red-500' : ''}>
              All
            </Link>
          </li>
          {categoryList.map((cg) => (
            <li key={cg.dirName}>
              <Link
                href={`/blog/${cg.dirName}`}
                className={cg.dirName === category ? 'text-red-500' : ''}>
                {cg.publicName}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="w-[1000px] mx-auto">
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
