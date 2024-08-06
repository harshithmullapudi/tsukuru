import path from 'path';
import { promises as fs } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'next-mdx-remote/serialize';

export async function GET(req: NextRequest) {
  const fileName = req.nextUrl.searchParams.get('fileName');

  // Construct the file path
  const filePath = path.join(process.cwd(), `./${fileName}`);

  try {
    // Read the file
    const fileContents = await fs.readFile(filePath, 'utf8');

    if (fileName?.includes('.json')) {
      return NextResponse.json(JSON.parse(fileContents));
    } else {
      const mdxSource = await serialize(fileContents, {
        parseFrontmatter: true,
      });

      return NextResponse.json(mdxSource);
    }
  } catch (error) {
    NextResponse.json({ error: 'File not found or invalid JSON' });
  }
}
