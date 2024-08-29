import { LinkProps } from 'next/link';
import { PropsWithChildren } from 'react';

export const ExternalLink = ({
  children,
  href,
  ...props
}: PropsWithChildren<LinkProps>) => {
  return (
    <a
      {...props}
      target="_blanck"
      href={href.toString() || ''}
      className="text-pink-600 transition no-underline hover:underline underline-offset-4 duration-75">
      {children}
    </a>
  );
};
