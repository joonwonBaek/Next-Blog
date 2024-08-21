import { PostBody } from '@/components/md/PostBody';
import { getPostDetail } from '@/lib/post';

type Props = {
  params: { category: string; slug: string };
};

// 허용된 param 외 접근시 404

const PostDetail = async ({ params }: Props) => {
  const { category, slug } = params;
  const post = await getPostDetail(category, slug);

  return (
    <div className="w-[1000px] mx-auto">
      <header>
        <h1>{post.title}</h1>
        <div>{post.date.toISOString()}</div>
      </header>
      <div>
        <PostBody>{post.content}</PostBody>
      </div>
    </div>
  );
};

export default PostDetail;
