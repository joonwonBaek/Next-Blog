import { baseDomain } from '@/config/const';
import { getSitemapMemoList } from '@/lib/memo';
import { getSitemapPostList } from '@/lib/post';

export default async function sitemap() {
  const postList = await getSitemapPostList();
  const memoList = await getSitemapMemoList();
  const baseUrl = baseDomain;
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...postList,
    ...memoList,
  ];
}
