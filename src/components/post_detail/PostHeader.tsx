import dayjs from 'dayjs';
import { CalendarDays, Clock3 } from 'lucide-react';
import Link from 'next/link';

import { Post } from '@/lib/post';

interface Props {
  post: Post;
}

export const PostHeader = ({ post }: Props) => {
  const date = dayjs(post.date).locale('ko').format('YYYY년 MM월 DD일');
  return (
    <header className="text-center">
      <h1 className="text-center">{post.title}</h1>
      <div className="text-base">
        <Link href={`/blog/${post.categoryPath}`}>
          {post.categoryPublicName}
        </Link>
      </div>
      <div className="flex justify-center gap-3 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <CalendarDays className="w-3.5" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock3 className="w-3.5" />
          <span>{post.readingMinutes}</span>
        </div>
      </div>
      <hr />
    </header>
  );
};
