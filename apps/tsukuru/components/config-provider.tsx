'use client';

import { createContext, useContext, useState } from 'react';
import { TsukuruConfigType } from './type';
import { useDynamicFile } from '@/lib/use-dynamic-file';
import { Loader } from './ui/loader';

export const TsukuruConfigContext = createContext<
  TsukuruConfigType | undefined
>(undefined);

export function TsukuruConfig({ children }: { children: React.ReactNode }) {
  const { data, loading } = useDynamicFile('tsukuru.json');

  if (loading) {
    return <Loader />;
  }

  return (
    <TsukuruConfigContext.Provider value={data}>
      {children}
    </TsukuruConfigContext.Provider>
  );
}
