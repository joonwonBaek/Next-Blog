import { getSitemapPostList } from '@/lib/post';

export default async function sitemap() {
  const postList = await getSitemapPostList();
  const baseUrl = 'https://next-blog-azure-xi.vercel.app/blog';
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...postList,
  ];
}
