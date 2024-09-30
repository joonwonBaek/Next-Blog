import dayjs from 'dayjs';
import fs from 'fs';
import { sync } from 'glob';
import matter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';

import { CategoryDetail, HeadingItem, Post, PostMatter } from '@/config/types';

export interface ContentConfig {
  basePath: string;
  contentType: 'blog' | 'memo';
  baseUrl: string;
}

const createContentUtils = (config: ContentConfig) => {
  const CONTENT_PATH = path.join(process.cwd(), config.basePath);

  const getContentPaths = (category?: string) => {
    const folder = category || '**';
    return sync(`${CONTENT_PATH}/${folder}/**/*.mdx`);
  };

  const parseContentAbstract = (contentPath: string) => {
    const filePath = contentPath
      .slice(contentPath.indexOf(config.basePath))
      .replace(`${config.basePath}\\`, '')
      .replace('.mdx', '');

    const [categoryPath, slug] = filePath.split('\\');

    const url = `/${config.contentType}/${categoryPath}/${slug}`;
    const categoryPublicName = getCategoryPublicName(categoryPath);

    return {
      url,
      categoryPath,
      categoryPublicName,
      slug,
    };
  };

  const parseContentDetail = async (contentPath: string) => {
    const file = fs.readFileSync(contentPath, 'utf8');
    const { data, content } = matter(file);
    const grayMatter = data as PostMatter;
    const readingMinutes = Math.ceil(readingTime(content).minutes);
    const dateString = dayjs(grayMatter.date)
      .locale('ko')
      .format('YYYY년 MM월 DD일');

    return { ...grayMatter, dateString, content, readingMinutes };
  };

  const parseContent = async (contentPath: string): Promise<Post> => {
    const contentAbstract = parseContentAbstract(contentPath);
    const contentDetail = await parseContentDetail(contentPath);
    return {
      ...contentAbstract,
      ...contentDetail,
    };
  };

  const getContentList = async (category?: string): Promise<Post[]> => {
    const contentPaths = getContentPaths(category);
    return Promise.all(contentPaths.map((path) => parseContent(path)));
  };

  const getSortedContentList = async (category?: string) => {
    const contentList = await getContentList(category);
    return contentList.sort((a, b) => (a.date > b.date ? -1 : 1));
  };

  const getCategoryList = () => {
    const cgPaths: string[] = sync(`${CONTENT_PATH}/*`);
    return cgPaths.map((path) => path.split('\\').slice(-1)?.[0]);
  };

  const getCategoryDetailList = async () => {
    const contentList = await getContentList();
    const result: { [key: string]: number } = {};
    for (const content of contentList) {
      const category = content.categoryPath;
      result[category] = (result[category] || 0) + 1;
    }
    return Object.entries(result).map(
      ([category, count]): CategoryDetail => ({
        dirName: category,
        publicName: getCategoryPublicName(category),
        count,
      }),
    );
  };

  const getContentDetail = async (category: string, slug: string) => {
    const filePath = `${CONTENT_PATH}\\${category}\\${slug}\\content.mdx`;
    return parseContent(filePath);
  };

  const getSitemapContentList = async () => {
    const contentList = await getContentList();
    return contentList.map(({ url }) => ({
      lastModified: new Date(),
      url: `${config.baseUrl}${url}`,
    }));
  };

  const getAllContentCount = async () => {
    return (await getContentList()).length;
  };

  return {
    getContentPaths,
    parseContentAbstract,
    parseContentDetail,
    parseContent,
    getContentList,
    getSortedContentList,
    getCategoryList,
    getCategoryDetailList,
    getContentDetail,
    getSitemapContentList,
    getAllContentCount,
  };
};

// Utility functions that don't depend on the content type
export const getCategoryPublicName = (dirPath: string) =>
  dirPath
    .split('_')
    .map((token) => token[0].toUpperCase() + token.slice(1, token.length))
    .join(' ');

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

// Create instances for posts and memos
const baseUrl = 'https://next-blog-azure-xi.vercel.app';
const postUtils = createContentUtils({
  basePath: 'src\\posts',
  contentType: 'blog',
  baseUrl,
});
const memoUtils = createContentUtils({
  basePath: 'src\\memos',
  contentType: 'memo',
  baseUrl,
});

export { memoUtils, postUtils };
