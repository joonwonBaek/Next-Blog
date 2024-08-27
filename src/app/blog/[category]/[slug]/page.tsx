import { PostBody } from '@/components/post/PostBody';
import { PostHeader } from '@/components/post/PostHeader';
import ScrollProgressBar from '@/layouts/ScrollProgressBar';
import { getPostDetail, getPostParamList } from '@/lib/post';

type Props = {
  params: { category: string; slug: string };
};

// 허용된 param 외 접근시 404
export const dynamicParams = false;

export async function generateStaticParams() {
  const paramList = getPostParamList();
  return paramList;
}

const PostDetail = async ({ params }: Props) => {
  const { category, slug } = params;
  const post = await getPostDetail(category, slug);

  return (
    <>
      <ScrollProgressBar />
      <div className="w-[800px] mx-auto prose max-w-none dark:prose-invert">
        <PostHeader post={post} />
        <PostBody>{post.content}</PostBody>
      </div>
    </>
  );
};

export default PostDetail;
