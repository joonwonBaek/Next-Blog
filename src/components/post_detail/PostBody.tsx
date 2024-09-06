// @ts-expect-error no types
import remarkA11yEmoji from '@fec/remark-a11y-emoji';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';

import { Post } from '@/config/types';

import { MdxComponents } from '../mdx';

interface Props {
  post: Post;
}

export const PostBody = ({ post }: Props) => {
  return (
    <MDXRemote
      source={post.content}
      options={{
        mdxOptions: {
          remarkPlugins: [
            // 깃허브 Flavored 마크다운 지원 추가 (version downgrade)
            remarkGfm,
            // 이모티콘 접근성 향상
            remarkA11yEmoji,
            // 제목을 기반으로 목차를 생성합니다.
            remarkToc,
            remarkBreaks,
          ],
          // 함께 작동하여 ID를 추가하고 제목을 연결합니다.
          // @ts-ignore
          rehypePlugins: [rehypePrettyCode, rehypeSlug, rehypeAutolinkHeadings],
        },
      }}
      components={MdxComponents}
    />
  );
};
