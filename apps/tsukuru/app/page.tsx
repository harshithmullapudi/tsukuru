'use client';

import { TsukuruConfigContext } from '@/components/config-provider';
import { TsukuruConfigType } from '@/components/type';
import { Loader } from '@/components/ui/loader';
import { useRouter } from 'next/router';
import React from 'react';
import { useContext } from 'react';

export default function Home() {
  const tsukuruConfig = useContext(TsukuruConfigContext) as TsukuruConfigType;
  const router = useRouter();
  const group = tsukuruConfig.navigation[0];

  React.useEffect(() => {
    const route = group.pages[0];
    router.push(route);
  }, []);

  return <Loader />;
}
