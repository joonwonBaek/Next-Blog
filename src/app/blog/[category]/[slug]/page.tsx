import { Metadata } from 'next';

import FloatingButton from '@/components/common/FloatingButton';
import Giscus from '@/components/post_detail/Giscus';
import { PostBody } from '@/components/post_detail/PostBody';
import { PostHeader } from '@/components/post_detail/PostHeader';
import TableOfContentSidebar from '@/components/post_detail/TableOfContentSidebar';
import TableOfContentTop from '@/components/post_detail/TableOfContentTop';
import {
  getPostDetail,
  getPostPaths,
  parsePostAbstract,
  parseToc,
} from '@/lib/post';

type Props = {
  params: { category: string; slug: string };
};

// 허용된 param 외 접근시 404
export const dynamicParams = false;

const baseDomain = 'https://next-blog-azure-xi.vercel.app';

export async function generateMetadata({
  params: { category, slug },
}: Props): Promise<Metadata> {
  const post = await getPostDetail(category, slug);

  const title = `${post.title} | BAEK`;
  const imageURL = `${baseDomain}${post.thumbnail}`;

  return {
    title,
    description: post.desc,

    openGraph: {
      title,
      description: post.desc,
      url: `${baseDomain}${post.url}`,
      siteName: 'BAEK BLOG',
      type: 'website',
      images: [imageURL],
    },
    // twitter: {
    //   card: 'summary_large_image',
    //   title
    // },
  };
}

export const generateStaticParams = () => {
  const postPaths: string[] = getPostPaths();
  const paramList = postPaths
    .map((path) => parsePostAbstract(path))
    .map((item) => ({ category: item.categoryPath, slug: item.slug }));
  return paramList;
};

const PostDetail = async ({ params }: Props) => {
  const { category, slug } = params;
  const post = await getPostDetail(category, slug);
  const toc = parseToc(post.content);

  return (
    <>
      <div className="max-w-[750px] px-4 w-full mx-auto prose dark:prose-invert">
        <PostHeader post={post} />
        <TableOfContentTop toc={toc} />
        <article className="relative">
          <TableOfContentSidebar toc={toc} />
          <PostBody post={post} />
        </article>
        <hr />
        <Giscus />
        <FloatingButton />
      </div>
    </>
  );
};

export default PostDetail;
