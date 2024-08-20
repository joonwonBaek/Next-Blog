import fs from 'fs';
import { sync } from 'glob';
import matter from 'gray-matter';
import path from 'path';

const BASE_PATH = 'src\\posts';
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);
console.log(POSTS_PATH);

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
  content: string;
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
    .replace(`${BASE_PATH}\\`, '') // BASE_PATH 뒤의 \를 제거
    .replace('.mdx', ''); // .mdx 확장자 제거

  console.log(postPath);

  console.log(`파일 경로 테스트 ${filePath}`);

  // Windows 경로의 경우, \를 기준으로 split
  const [categoryPath, slug] = filePath.split('\\');

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

  return { ...grayMatter, content };
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

export const getPostDetail = async (category: string, slug: string) => {
  const filePath = `${POSTS_PATH}\\${category}\\${slug}.mdx`;
  const detail = await parsePost(filePath);
  return detail;
};
