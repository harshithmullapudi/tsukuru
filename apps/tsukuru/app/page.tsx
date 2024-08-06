'use client';

import { TsukuruConfigContext } from '@/components/config-provider';
import { TsukuruConfigType } from '@/components/type';
import { MDXContent } from '@/components/ui/mdx-content';
import { useMDXComponents } from '@/mdx-components';
import { useContext } from 'react';

export default function Home() {
  const tsukuruConfig = useContext(TsukuruConfigContext) as TsukuruConfigType;
  const tab = tsukuruConfig.tabs.find((tab) => tab.path === '/');

  return (
    <div>
      <MDXContent fileName={tab?.content as string} />
    </div>
  );
}
