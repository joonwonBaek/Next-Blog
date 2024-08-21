import { PostBody } from '@/components/md/PostBody';
import { PostHeader } from '@/components/md/PostHeader';
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
    <div className="w-[900px] mx-auto">
      <PostHeader post={post} />
      <div className="prose max-w-none">
        <PostBody>{post.content}</PostBody>
      </div>
    </div>
  );
};

export default PostDetail;
