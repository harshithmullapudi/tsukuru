import path from 'path';
import fs from 'node:fs';
import { log } from '@clack/prompts';

/**
 * Check if tsukuru.json exists in the current directory.
 * @returns {boolean} True if tsukuru.json exists, otherwise false.
 */
export function checkTsukuruJson() {
  const tsukuruJsonPath = path.join(process.cwd(), 'tsukuru.json');

  if (!fs.existsSync(tsukuruJsonPath)) {
    log.error('tsukuru.json not found in the current directory. Exiting...');
    process.exit(1);
  }

  return true;
}
