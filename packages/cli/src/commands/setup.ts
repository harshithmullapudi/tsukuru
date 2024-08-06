import { intro, note, outro, spinner } from '@clack/prompts';
import { Command } from 'commander';
import {
  CommonCommandOptions,
  commonOptions,
  wrapCommandAction,
} from '../cli/common';
import { getVersion } from '../utilities/getVersion';
import { printInitialBanner } from '../utilities/initialBanner';
import { execa } from 'execa';
import fs from 'node:fs';
import degit from 'degit';
import path from 'node:path';
import { checkTsukuruJson } from '../utilities/checkConfigFile';

export function configureSetupCommand(program: Command) {
  return commonOptions(
    program
      .command('setup')
      .description('Setup next.js app required to run tsukuru'),
  )
    .version(getVersion(), '-v, --version', 'Display the version number')
    .action(async (options) => {
      checkTsukuruJson(); // Check for tsukuru.json before proceeding
      await printInitialBanner(false);
      await setupCommand(options);
    });
}

export async function setupCommand(options: unknown) {
  return await wrapCommandAction(
    'setupCommand',
    CommonCommandOptions,
    options,
    async (opts) => {
      return await _setupCommand(opts);
    },
  );
}

async function _setupCommand(options: CommonCommandOptions) {
  return setup();
}

export async function setup() {
  intro('Setting up Tsukuru project...');

  const homeDir = require('os').homedir();
  const tsukuruDir = path.join(homeDir, '.tsukuru');

  // Create .tsukuru folder if it doesn't exist
  if (!fs.existsSync(tsukuruDir)) {
    fs.mkdirSync(tsukuruDir);
    note(`Created directory: ${tsukuruDir}`);
  } else {
    note(`Directory already exists: ${tsukuruDir}`);
  }

  // Clone the repository
  const emitter = degit('harshithmullapudi/tsukuru', {
    cache: false,
    force: true,
    verbose: true,
  });

  const spin = spinner();
  spin.start('Cloning repository...');

  try {
    await emitter.clone(tsukuruDir);
    spin.stop('Repository cloned successfully.');
  } catch (error) {
    spin.stop('Failed to clone repository.');
    console.error(error);
    process.exit(1);
  }

  // Check if pnpm is installed, if not install it
  try {
    await execa('pnpm', ['--version']);
    note('pnpm is already installed.');
  } catch {
    note('pnpm is not installed. Installing pnpm...');
    try {
      await execa('npm', ['install', '-g', 'pnpm']);
      note('pnpm installed successfully.');
    } catch (error) {
      console.error('Error: pnpm installation failed');
      console.error(error);
      process.exit(1);
    }
  }

  // Run pnpm install in the .tsukuru folder
  try {
    await execa('pnpm', ['install'], { cwd: tsukuruDir, stdio: 'inherit' });
    note('pnpm install completed successfully.');
  } catch (error) {
    console.error('Error: pnpm install failed');
    console.error(error);
    process.exit(1);
  }

  outro('Tsukuru project setup completed successfully!');
}
