'use client';

import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { TsukuruConfigContext } from './config-provider';
import { TsukuruConfigType } from './type';

export function Nav() {
  const pathname = usePathname();
  const tsukuruConfig = useContext(TsukuruConfigContext) as TsukuruConfigType;

  const getDefaultValue = () => {
    const tab = tsukuruConfig.tabs.find((tab) => pathname.includes(tab.path));

    return tab?.name;
  };

  return (
    <nav className="sticky top-0 right-0 isolate z-10 flex items-center justify-between py-4 px-5 bg-background">
      <Tabs defaultValue={getDefaultValue()} className="-pl-3">
        <TabsList className="flex w-full flex-wrap">
          {tsukuruConfig.tabs.map((tab) => {
            return (
              <TabsTrigger value={tab.name}>
                <Link href="/">{tab.name}</Link>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>

      <div className="flex gap-1">
        {tsukuruConfig.socials.github && (
          <a href={tsukuruConfig.socials.github} target="_blank">
            GitHub
          </a>
        )}
      </div>
    </nav>
  );
}
