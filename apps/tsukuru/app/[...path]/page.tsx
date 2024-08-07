'use client';

import { TsukuruConfigContext } from '@/components/config-provider';
import { TsukuruConfigType } from '@/components/type';
import { MDXContent } from '@/components/ui/mdx-content';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';

export default function AllRoutes() {
  const pathname = usePathname();

  return (
    <div>
      <MDXContent fileName={`${pathname.slice(1)}.mdx`} />
    </div>
  );
}
