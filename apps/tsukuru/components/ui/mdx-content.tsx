import { useDynamicFile } from '@/lib/use-dynamic-file';

import { Loader } from './loader';
import { MDXRemote } from 'next-mdx-remote';
import { customComponents } from '@/mdx-components';

export const MDXContent = ({ fileName }: { fileName: string }) => {
  const { data, loading } = useDynamicFile(fileName);

  if (loading || !data) {
    return <Loader />;
  }

  return (
    <div>
      <MDXRemote {...data} components={{ ...customComponents }} />
    </div>
  );
};
