// @ts-expect-error no types
import remarkA11yEmoji from '@fec/remark-a11y-emoji';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

import { Project } from '@/config/types';

import { MdxComponents } from '../mdx';

interface Props {
  project: Project;
}

export const ProjectBody = ({ project }: Props) => {
  return (
    <MDXRemote
      source={project.content}
      options={{
        mdxOptions: {
          remarkPlugins: [
            // 깃허브 Flavored 마크다운 지원 추가 (version downgrade)
            remarkGfm,
            // 이모티콘 접근성 향상
            remarkA11yEmoji,
            // 제목을 기반으로 목차를 생성합니다.
            remarkBreaks,
          ],
          rehypePlugins: [
            // pretty code block
            [
              // @ts-ignore
              rehypePrettyCode,
              {
                theme: { dark: 'github-dark-dimmed', light: 'github-light' },
              },
            ],
            // ID를 추가하고 제목을 연결합니다.
            rehypeSlug,
          ],
        },
      }}
      components={MdxComponents}
    />
  );
};
