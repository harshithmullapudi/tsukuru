import type { Metadata } from 'next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';

import './globals.css';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { TsukuruConfig } from '@/components/config-provider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistMono.variable} ${GeistSans.variable} h-full w-full`}
    >
      <body className="w-full h-full font-sans bg-background">
        <TsukuruConfig>
          <div className="h-full w-full flex flex-col overflow-hidden">
            <main className="mx-auto w-full max-w-screen-sm font-sans md:max-w-screen-md lg:max-w-screen-lg overflow-auto flex flex-col gap-6">
              <Nav />
              <div className="px-8">{children}</div>
              <div className="px-8">
                <Footer />
              </div>
            </main>
          </div>
        </TsukuruConfig>
      </body>
    </html>
  );
}
