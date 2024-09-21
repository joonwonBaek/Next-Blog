import { Metadata } from 'next';

import MemoListPage from '@/components/post_list/MemoListPage';
import { baseDomain } from '@/config/const';
import { getCategoryList, getCategoryPublicName } from '@/lib/memo';

type Props = {
  params: { category: string };
};
// 허용된 param 외 접근시 404
export const dynamicParams = false;

export const generateStaticParams = () => {
  const categoryList = getCategoryList();
  const paramList = categoryList.map((category) => ({ category }));
  return paramList;
};

// 한국어 인코딩 추가
export async function generateMetadata({
  params: { category },
}: Props): Promise<Metadata> {
  const cg = getCategoryPublicName(category);
  const title = `${cg} | BAEK BLOG`;
  const url = `${baseDomain}/${category}`;

  return {
    title,
    openGraph: {
      title,
      url,
    },
    twitter: {
      title,
    },
  };
}

const CategoryPage = async ({ params }: Props) => {
  return <MemoListPage category={params.category} />;
};

export default CategoryPage;
