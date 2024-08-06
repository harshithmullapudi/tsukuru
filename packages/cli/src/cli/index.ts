import { Command } from 'commander';

import { COMMAND_NAME } from '../consts';
import { getVersion } from '../utilities/getVersion';
import { configureSetupCommand } from '../commands/setup';
import { configureDevCommand } from '../commands/dev';
import { configureBuildCommand } from '../commands/build';

export const program = new Command();

program
  .name(COMMAND_NAME)
  .description('Create, run and build tsukuru pages')
  .version(getVersion(), '-v, --version', 'Display the version number');

configureSetupCommand(program);
configureDevCommand(program);
configureBuildCommand(program);
