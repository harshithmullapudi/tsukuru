import { Command } from 'commander';

import { COMMAND_NAME } from '../consts';
import { getVersion } from '../utilities/getVersion';

export const program = new Command();

program
  .name(COMMAND_NAME)
  .description('Create, run and build tsukuru pages')
  .version(getVersion(), '-v, --version', 'Display the version number');
