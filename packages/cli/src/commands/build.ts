import { Command } from 'commander';
import { commonOptions } from '../cli/common';
import { getVersion } from '../utilities/getVersion';
import { printInitialBanner } from '../utilities/initialBanner';
import chokidar from 'chokidar';
import { note, log } from '@clack/prompts';
import { execa } from 'execa';
import path from 'node:path';
import cpy from 'cpy';
import { checkTsukuruJson } from '../utilities/checkConfigFile';

let currentProcess;

export function configureBuildCommand(program: Command) {
  return commonOptions(
    program
      .command('build')
      .description('build tsukuru in local and save to dist folder'),
  )
    .version(getVersion(), '-v, --version', 'Display the version number')
    .action(async (options) => {
      checkTsukuruJson(); // Check for tsukuru.json before proceeding
      await runBuild();
      await copyFiles();
    });
}

// Path to the .tsukuru/apps/tsukuru directory
const tsukuruPath = path.join(
  process.env.HOME as string,
  '.tsukuru',
  'apps',
  'tsukuru',
);
// Path to the dist directory
const distPath = path.join(process.cwd(), 'dist');

// Watch for file changes
// Function to run the build command
async function runBuild() {
  note(`Starting build`);

  try {
    await execa('pnpm', ['build'], {
      cwd: tsukuruPath,
      stdout: 'pipe',
      stderr: 'pipe',
    });
    note('Build completed successfully.');
  } catch (err: any) {
    log.error(`Build failed: ${err.message}`);
    process.exit(1);
  }
}

// Function to copy files
async function copyFiles() {
  try {
    // Create the dist directory if it doesn't exist
    await cpy(['.next/**', 'package.json'], distPath, { cwd: tsukuruPath });

    // Copy all items from the current working directory to dist
    await cpy(['*', '!build_dist/**'], distPath, { cwd: process.cwd() });

    note('Files copied successfully.');
  } catch (err: any) {
    log.error(`File copy failed: ${err.message}`);
    process.exit(1);
  }
}
