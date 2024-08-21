// import Link from 'next/link';
import { MDXComponents } from 'mdx/types';

import { MDXImage } from './MdxImage';

export const mdxComponents: MDXComponents = {
  // a: ({ children, ...props }) => {
  //   return (
  //     <Link {...props} href={props.href || ''}>
  //       {children}
  //     </Link>
  //   );
  // },
  img: MDXImage as any,
  h1: ({ children }) => {
    return <div className="text-amber-500">{children}</div>;
  },
  // 마크다운에 사용하려는 다른 컴포넌트
};
