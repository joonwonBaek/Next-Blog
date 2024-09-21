'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';

{
  /* <script
  src="https://giscus.app/client.js"
  data-repo="joonwonBaek/Next-Blog"
  data-repo-id="R_kgDOMluWrg"
  data-category="Comments"
  data-category-id="DIC_kwDOMluWrs4CiN1z"
  data-mapping="pathname"
  data-strict="0"
  data-reactions-enabled="1"
  data-emit-metadata="0"
  data-input-position="bottom"
  data-theme="preferred_color_scheme"
  data-lang="ko"
  crossorigin="anonymous"
  async></script>; */
}
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

    scriptElement.setAttribute('data-repo', 'joonwonBaek/Next-Blog');
    scriptElement.setAttribute('data-repo-id', 'R_kgDOMluWrg');
    scriptElement.setAttribute('data-category', 'Comments');
    scriptElement.setAttribute('data-category-id', 'DIC_kwDOMluWrs4CiN1z');
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
