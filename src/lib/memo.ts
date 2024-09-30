import dayjs from 'dayjs';
import fs from 'fs';
import { sync } from 'glob';
import matter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';

import { baseDomain } from '@/config/const';
import { CategoryDetail, HeadingItem, Post, PostMatter } from '@/config/types';

const BASE_PATH = 'src/memos';
const MEMOS_PATH = path.join(process.cwd(), BASE_PATH);

// 모든 mdx 파일 조회
export const getMemoPaths = (category?: string) => {
  const folder = category || '**';
  const memoPaths: string[] = sync(`${MEMOS_PATH}/${folder}/**/*.mdx`);
  return memoPaths;
};

// mdx 파일 파싱: abstract / detail 구분
const parseMemo = async (memoPath: string): Promise<Post> => {
  const memoAbstract = parseMemoAbstract(memoPath);
  const memoDetail = await parseMemoDetail(memoPath);
  return {
    ...memoAbstract,
    ...memoDetail,
  };
};

// MDX의 개요 파싱
// url, cg path, cg name, slug
export const parseMemoAbstract = (memoPath: string) => {
  const filePath = memoPath
    .slice(memoPath.indexOf(BASE_PATH))
    .replace(`${BASE_PATH}/`, '') // BASE_PATH 뒤의 \를 제거
    .replace('.mdx', ''); // .mdx 확장자 제거

  const [categoryPath, slug] = filePath.split('/');

  const url = `/memo/${categoryPath}/${slug}`;
  const categoryPublicName = getCategoryPublicName(categoryPath);

  return {
    url,
    categoryPath,
    categoryPublicName,
    slug,
  };
};

// MDX detail
const parseMemoDetail = async (memoPath: string) => {
  const file = fs.readFileSync(memoPath, 'utf8');
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

// memo를 날짜 최신순으로 정렬
const sortMemoList = (MemoList: Post[]) => {
  return MemoList.sort((a, b) => (a.date > b.date ? -1 : 1));
};

// 모든 메모 목록 조회. 메모 메인 페이지에서 사용
export const getMemoList = async (category?: string): Promise<Post[]> => {
  const memoPaths = getMemoPaths(category);
  const memoList = await Promise.all(memoPaths.map((path) => parseMemo(path)));

  return memoList;
};

export const getSortedMemoList = async (category?: string) => {
  const memoList = await getMemoList(category);
  return sortMemoList(memoList);
};

// category 목록 조회
export const getCategoryParamList = () => {
  const categoryList = getCategoryList();

  return categoryList.map((category) => ({ category }));
};

export const getSitemapMemoList = async () => {
  const memoList = await getMemoList();
  const baseUrl = baseDomain;
  const sitemapMemoList = memoList.map(({ url }) => ({
    lastModified: new Date(),
    url: `${baseUrl}${url}`,
  }));
  return sitemapMemoList;
};

export const getAllMemoCount = async () => {
  return (await getMemoList()).length;
};

export const getCategoryList = () => {
  const cgPaths: string[] = sync(`${MEMOS_PATH}/*`);
  const cgList = cgPaths.map((path) => path.split('/').slice(-1)?.[0]);

  return cgList;
};

export const getCategoryDetailList = async () => {
  const memoList = await getMemoList();
  const result: { [key: string]: number } = {};
  for (const memo of memoList) {
    const category = memo.categoryPath;
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

// memo 상세 페이지 내용 조회
export const getMemoDetail = async (category: string, slug: string) => {
  const filePath = `${MEMOS_PATH}/${category}/${slug}/content.mdx`;
  const detail = await parseMemo(filePath);
  return detail;
};

export const parseToc = (content: string): HeadingItem[] => {
  const regex = /^(##|###) (.*$)/gim;
  const headingList = content.match(regex);
  return (
    headingList?.map((heading: string) => ({
      text: heading.replace('##', '').replace('#', ''),
      link:
        '#' +
        heading
          .replace('# ', '')
          .replace('#', '')
          .replace(/[\[\]:!@#$/%^&*()+=,.]/g, '')
          .replace(/ /g, '-')
          .toLowerCase()
          .replace('?', ''),
      indent: (heading.match(/#/g)?.length || 2) - 2,
    })) || []
  );
};
