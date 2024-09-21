import { Metadata } from 'next';

import FloatingButton from '@/components/common/FloatingButton';
import Giscus from '@/components/post_detail/Giscus';
import { PostBody } from '@/components/post_detail/PostBody';
import { PostHeader } from '@/components/post_detail/PostHeader';
import TableOfContentSidebar from '@/components/post_detail/TableOfContentSidebar';
import TableOfContentTop from '@/components/post_detail/TableOfContentTop';
import { baseDomain } from '@/config/const';
import {
  getMemoDetail,
  getMemoPaths,
  parseMemoAbstract,
  parseToc,
} from '@/lib/memo';

type Props = {
  params: { category: string; slug: string };
};

// 허용된 param 외 접근시 404
export const dynamicParams = false;

export async function generateMetadata({
  params: { category, slug },
}: Props): Promise<Metadata> {
  const memo = await getMemoDetail(category, slug);

  const title = `${memo.title} | BAEK`;
  const imageURL = `${baseDomain}${memo.thumbnail}`;

  return {
    title,
    description: memo.desc,

    openGraph: {
      title,
      description: memo.desc,
      url: `${baseDomain}${memo.url}`,
      images: [imageURL],
    },
    twitter: {
      title,
      description: memo.desc,
      images: [imageURL],
    },
  };
}

export const generateStaticParams = () => {
  const postPaths: string[] = getMemoPaths();
  const paramList = postPaths
    .map((path) => parseMemoAbstract(path))
    .map((item) => ({ category: item.categoryPath, slug: item.slug }));
  return paramList;
};

// 한국어 인코딩 추가
const MemoDetail = async ({ params }: Props) => {
  const { category, slug } = params;
  const memo = await getMemoDetail(category, slug);
  const toc = parseToc(memo.content);

  return (
    <>
      <div className="max-w-[750px] px-4 w-full mx-auto prose dark:prose-invert">
        <PostHeader post={memo} />
        <TableOfContentTop toc={toc} />
        <article className="relative">
          <TableOfContentSidebar toc={toc} />
          <PostBody post={memo} />
        </article>
        <hr />
        <Giscus />
        <FloatingButton />
      </div>
    </>
  );
};

export default MemoDetail;
