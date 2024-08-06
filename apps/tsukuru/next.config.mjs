import remarkGfm from 'remark-gfm';
import createMDX from '@next/mdx';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  transpilePackages: ['next-mdx-remote'],
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm, remarkParse, remarkRehype],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
