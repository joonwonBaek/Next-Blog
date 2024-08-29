import dayjs from 'dayjs';
import { CalendarDays, Clock3 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Post } from '@/lib/post';

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  const date = dayjs(post.date).locale('ko').format('YYYY년 MM월 DD일');
  console.log(post);

  return (
    <Link href={post.url}>
      <li className="flex flex-col gap-3">
        <div className="w-full aspect-video border rounded-md relative">
          <Image
            src={post.thumbnail}
            alt={`thumbnamil for ${post.title}`}
            fill
            className="rounded-md"
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div>
          <div className="text-pink-600 font-medium">
            {post.categoryPublicName}
          </div>
          <h2 className="text-xl font-bold">{post.title}</h2>
          <div className="flex gap-3 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <CalendarDays className="w-3.5" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock3 className="w-3.5" />
              <span>{post.readingMinutes}</span>
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default PostCard;
