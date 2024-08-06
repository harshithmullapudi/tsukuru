import { Command } from 'commander';
import { commonOptions } from '../cli/common';
import { getVersion } from '../utilities/getVersion';
import { printInitialBanner } from '../utilities/initialBanner';
import chokidar from 'chokidar';
import { note, log } from '@clack/prompts';
import { execa } from 'execa';
import path from 'node:path';
import { checkTsukuruJson } from '../utilities/checkConfigFile';

let currentProcess;

export function configureDevCommand(program: Command) {
  return commonOptions(
    program.command('dev').description('run tsukuru in local'),
  )
    .version(getVersion(), '-v, --version', 'Display the version number')
    .action(async (options) => {
      checkTsukuruJson(); // Check for tsukuru.json before proceeding
      await printInitialBanner(false);
      currentProcess = await runDev();
      watchFiles(currentProcess);
    });
}

// Watch for file changes
function watchFiles(currentProcess: any) {
  const watcher = chokidar.watch('.', { ignored: /node_modules/ });

  watcher.on('change', (path) => {
    note(`File ${path} has been changed. Restarting...`);
    if (currentProcess) {
      currentProcess.kill();
    }
    currentProcess = runDev();
  });

  watcher.on('add', (path) => {
    note(`File ${path} has been added. Restarting...`);
    if (currentProcess) {
      currentProcess.kill();
    }
    currentProcess = runDev();
  });

  watcher.on('unlink', (path) => {
    note(`File ${path} has been removed. Restarting...`);
    if (currentProcess) {
      currentProcess.kill();
    }
    currentProcess = runDev();
  });
}

function runDev() {
  note(`Starting dev mode`);
  const cwd = process.cwd();
  const tsukuruPath = path.join(
    process.env.HOME as string,
    '.tsukuru/apps/tsukuru',
  );
  const env = { ...process.env, TRIGGER_CONFIG_PATH: cwd };

  // Execute pnpm dev command
  const child = execa('pnpm', ['dev'], {
    env,
    cwd: tsukuruPath,
    stdout: 'pipe',
    stderr: 'pipe',
  });

  child.stdout.on('data', (data) => {
    note(data.toString());
  });

  child.stderr.on('data', (data) => {
    log.error(data.toString());
  });

  child.on('close', (code) => {
    note(`pnpm dev process exited with code ${code}`);
  });

  return child;
}
