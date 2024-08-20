import fs from 'fs';
import { sync } from 'glob';
import matter from 'gray-matter';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';

const BASE_PATH = '/src/posts';
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

interface PostMatter {
  title: string;
  date: Date;
  tags: string[];
}

export interface Post extends PostMatter {
  url: string;
  slug: string;
  categoryPath: string;
  categoryPublicName: string;
  mdx: MDXRemoteSerializeResult;
}

// target folder의 모든 mdx 파일 조회
const getPostPaths = () => {
  const postPaths: string[] = sync(`${POSTS_PATH}/**/*.mdx`);
  return postPaths;
};

// mdx 파일 파싱
const parsePost = async (postPath: string): Promise<Post> => {
  const postAbstract = parsePostAbstract(postPath);
  const postDetail = await parsePostDetail(postPath);
  return {
    ...postAbstract,
    ...postDetail,
  };
};

const parsePostAbstract = (postPath: string) => {
  const filePath = postPath
    .slice(postPath.indexOf(BASE_PATH))
    .replace(`${BASE_PATH}/`, '')
    .replace('.mdx', '');

  const [categoryPath, slug] = filePath.split('/');

  const url = `blog/${categoryPath}/${slug}`;

  const categoryPublicName = getCategoryPublicName(categoryPath);

  return {
    url,
    categoryPath,
    categoryPublicName,
    slug,
  };
};

const parsePostDetail = async (postPath: string) => {
  const file = fs.readFileSync(postPath, 'utf-8');
  const { data, content } = matter(file);
  const grayMatter = data as PostMatter;

  const mdx = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
      format: 'mdx',
    },
  });

  return {
    ...grayMatter,
    mdx,
  };
};

const getCategoryPublicName = (dirPath: string) => {
  return dirPath
    .split('_')
    .map((token) => token[0].toUpperCase() + token.slice(1, token.length))
    .join(' ');
};

const sortPostList = (PostList: Post[]) => {
  return PostList.sort((a: Post, b: Post) => {
    const dateA = a.date;
    const dateB = b.date;

    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;
    return 0;
  });
};

// 타겟 폴더에 있는 모든 mdx 파일을 탐색하여 가져옵니다.
export const getPostList = async (): Promise<Post[]> => {
  const postPaths = getPostPaths();

  const result = await Promise.all(
    postPaths.map((postPath) => parsePost(postPath)),
  );

  return sortPostList(result);
};

export const getPostParamList = () => {
  const postPaths: string[] = getPostPaths();
  const abstactList = postPaths
    .map((path) => parsePostAbstract(path))
    .map((item) => ({ category: item.categoryPath, slug: item.slug }));
  return abstactList;
};
