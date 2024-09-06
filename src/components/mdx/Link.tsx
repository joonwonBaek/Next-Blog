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
      className="break-words text-blue-600 no-underline underline-offset-4 hover:underline">
      {children}
    </a>
  );
};
