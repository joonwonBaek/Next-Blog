import dayjs from 'dayjs';
import fs from 'fs';
import { sync } from 'glob';
import matter from 'gray-matter';
import path from 'path';

import { Project, ProjectMatter } from '@/config/types';

const BASE_PATH = 'src\\memos';
const PROJECT_PATH = path.join(process.cwd(), BASE_PATH);

// 모든 mdx 파일 조회
export const getProjectPaths = () => {
  const projectPaths: string[] = sync(`${PROJECT_PATH}/**/*.mdx`);
  return projectPaths;
};

// MDX detail
const parseProject = async (projectPath: string) => {
  const file = fs.readFileSync(projectPath, 'utf8');
  const { data, content } = matter(file);
  const grayMatter = data as ProjectMatter;
  const startMonthString = dayjs(grayMatter.startMonth)
    .locale('ko')
    .format('YYYY년 MM월 DD일');
  const endMonthString = dayjs(grayMatter.endMonth)
    .locale('ko')
    .format('YYYY년 MM월 DD일');
  return { ...grayMatter, startMonthString, endMonthString, content };
};

// post를 날짜 최신순으로 정렬
const sortProjectList = (projectList: Project[]) => {
  return projectList.sort((a, b) => (a.endMonth > b.endMonth ? -1 : 1));
};

// MDX의 개요 파싱
// url, cg path, cg name, slug
export const parseProjectAbstract = (projectPath: string) => {
  const path = projectPath
    .slice(projectPath.indexOf(BASE_PATH))
    .replace(`${BASE_PATH}\\`, '')
    .replace('.mdx', '');

  const [slug, locale] = path.split('\\');

  const url = `/project/${slug}`;

  return { slug, url, locale };
};

// 모든 포스트 목록 조회. 블로그 메인 페이지에서 사용
export const getProjectList = async () => {
  const projectPaths = getProjectPaths();
  const projectList = await Promise.all(
    projectPaths.map((projectPath) => parseProject(projectPath)),
  );
  return projectList;
};

export const getSortedProjectList = async () => {
  const projectList = await getProjectList();
  return sortProjectList(projectList);
};

// post 상세 페이지 내용 조회
export const getProjectDetail = async (slug: string, locale: string) => {
  const filePath = `${PROJECT_PATH}\\${slug}\\${locale}.mdx`;
  const detail = await parseProject(filePath);
  return detail;
};
