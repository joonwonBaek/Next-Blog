// import Link from 'next/link';
import { MDXComponents } from 'mdx/types';

import { Callout } from './Callout';

export const MdxComponents: MDXComponents = {
  // a: ({ children, ...props }) => {
  //   return (
  //     <Link {...props} href={props.href || ''}>
  //       {children}
  //     </Link>
  //   );
  // },
  // img: Image,
  blockquote: Callout,
  Callout,
};
