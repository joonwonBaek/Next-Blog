import '@/config/globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { Toaster } from '@/components/ui/toaster';
import { baseDomain, blogDesc, blogName } from '@/config/const';
import { Footer } from '@/layouts/Footer';
import { Header } from '@/layouts/Header';
import { Providers as ThemeProvider } from '@/layouts/theme/Provider';
import { cn } from '@/lib/utils';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

export const metadata: Metadata = {
  metadataBase: new URL(baseDomain),
  title: blogName,
  description: blogDesc,
  openGraph: {
    title: blogName,
    siteName: blogName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: blogName,
    description: blogDesc,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className="h-full scroll-my-20 scroll-smooth"
      suppressHydrationWarning>
      <body className={cn(pretendard.className, 'min-h-screen flex flex-col')}>
        <ThemeProvider>
          <Header />
          <main className="mt-[64px] flex flex-1 flex-col">{children}</main>
          <Footer />
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
