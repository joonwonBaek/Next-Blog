import dayjs from 'dayjs';
import fs from 'fs';
import { sync } from 'glob';
import matter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';

import { CategoryDetail, HeadingItem, Post, PostMatter } from '@/config/types';

const BASE_PATH = 'src\\posts';
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

// 모든 mdx 파일 조회
export const getPostPaths = (category?: string) => {
  const folder = category || '**';
  const postPaths: string[] = sync(`${POSTS_PATH}/${folder}/**/*.mdx`);
  return postPaths;
};

// mdx 파일 파싱: abstract / detail 구분
const parsePost = async (postPath: string): Promise<Post> => {
  const postAbstract = parsePostAbstract(postPath);
  const postDetail = await parsePostDetail(postPath);
  return {
    ...postAbstract,
    ...postDetail,
  };
};

// MDX의 개요 파싱
// url, cg path, cg name, slug
export const parsePostAbstract = (postPath: string) => {
  const filePath = postPath
    .slice(postPath.indexOf(BASE_PATH))
    .replace(`${BASE_PATH}\\`, '') // BASE_PATH 뒤의 \를 제거
    .replace('.mdx', ''); // .mdx 확장자 제거

  const [categoryPath, slug] = filePath.split('\\');

  const url = `/blog/${categoryPath}/${slug}`;
  const categoryPublicName = getCategoryPublicName(categoryPath);

  return {
    url,
    categoryPath,
    categoryPublicName,
    slug,
  };
};

// MDX detail
const parsePostDetail = async (postPath: string) => {
  const file = fs.readFileSync(postPath, 'utf8');
  const { data, content } = matter(file);
  const grayMatter = data as PostMatter;
  const readingMinutes = Math.ceil(readingTime(content).minutes);
  const dateString = dayjs(grayMatter.date)
    .locale('ko')
    .format('YYYY년 MM월 DD일');

  return { ...grayMatter, dateString, content, readingMinutes };
};

// category folder name을 public name으로 변경 : dir_name -> Dir Name
export const getCategoryPublicName = (dirPath: string) =>
  dirPath
    .split('_')
    .map((token) => token[0].toUpperCase() + token.slice(1, token.length))
    .join(' ');

// post를 날짜 최신순으로 정렬
const sortPostList = (PostList: Post[]) => {
  return PostList.sort((a: Post, b: Post) => {
    const dateA = a.date;
    const dateB = b.date;

    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;
    return 0;
  });
};

// 모든 포스트 목록 조회. 블로그 메인 페이지에서 사용
export const getPostList = async (category?: string): Promise<Post[]> => {
  const postPaths: string[] = getPostPaths(category);
  const postList = await Promise.all(postPaths.map((path) => parsePost(path)));

  return postList;
};

export const getSortedPostList = async (category?: string) => {
  const postList = await getPostList(category);
  return sortPostList(postList);
};
// category 목록 조회
export const getCategoryParamList = () => {
  const categoryList = getCategoryList();

  return categoryList.map((category) => ({ category }));
};

export const getAllPostCount = async () => {
  return (await getPostList()).length;
};

export const getCategoryList = () => {
  const cgPaths: string[] = sync(`${POSTS_PATH}/*`);
  const cgList = cgPaths.map((path) => path.split('\\').slice(-1)?.[0]);

  return cgList;
};

export const getCategoryDetailList = async () => {
  const postList = await getPostList();
  const result: { [key: string]: number } = {};
  for (const post of postList) {
    const category = post.categoryPath;
    if (result[category]) {
      result[category] += 1;
    } else {
      result[category] = 1;
    }
  }
  const detailList: CategoryDetail[] = Object.entries(result).map(
    ([category, count]) => ({
      dirName: category,
      publicName: getCategoryPublicName(category),
      count,
    }),
  );
  return detailList;
};

// post 상세 페이지 내용 조회
export const getPostDetail = async (category: string, slug: string) => {
  const filePath = `${POSTS_PATH}\\${category}\\${slug}\\content.mdx`;
  const detail = await parsePost(filePath);
  return detail;
};

export const parseToc = (content: string): HeadingItem[] => {
  const regex = /^(#|##|###) (.*$)/gim;
  return (
    content.match(regex)?.map((heading: string) => ({
      text: heading.replace('#', '').replace('#', '>').replace('#', '>'),
      link:
        '#' +
        heading
          .replace('# ', '')
          .replace('#', '')
          .replace(/[\[\]:!@#$%^&*()+=]/g, '')
          .replace(/ /g, '-')
          .toLowerCase()
          .replace('?', ''),
      indent: heading.match(/#/g)?.length || 0,
    })) || []
  );
};
