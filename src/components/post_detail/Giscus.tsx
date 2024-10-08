'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';

const repoName = process.env.NEXT_PUBLIC_GISCUS_REPO_NAME || '';
const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID || '';
const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || '';

const Giscus = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  // https://github.com/giscus/giscus/tree/main/styles/themes
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light';

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://giscus.app/client.js';
    scriptElement.async = true;
    scriptElement.crossOrigin = 'anonymous';

    scriptElement.setAttribute('data-repo', repoName);
    scriptElement.setAttribute('data-repo-id', repoId);
    scriptElement.setAttribute('data-category', 'Comments');
    scriptElement.setAttribute('data-category-id', categoryId);
    scriptElement.setAttribute('data-mapping', 'pathname');
    scriptElement.setAttribute('data-strict', '0');
    scriptElement.setAttribute('data-reactions-enabled', '1');
    scriptElement.setAttribute('data-emit-metadata', '0');
    scriptElement.setAttribute('data-input-position', 'bottom');
    scriptElement.setAttribute('data-theme', theme);
    scriptElement.setAttribute('data-lang', 'ko');

    ref.current.appendChild(scriptElement);
  }, [theme]);

  // https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md#isetconfigmessage
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      'iframe.giscus-frame',
    );
    iframe?.contentWindow?.postMessage(
      { giscus: { setConfig: { theme } } },
      'https://giscus.app',
    );
  }, [theme]);

  return <section ref={ref} />;
};
export default Giscus;
