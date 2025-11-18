import { Command } from 'commander';
import { recordCommand } from './commands/record.js';

const program = new Command();

program
  .name('kz-wr')
  .description('CLI tool for KZ world records lookup')
  .version('0.1.0');

program
  .command('record')
  .description('Look up world record for a map')
  .argument('<mapName>', 'Name of the map to look up')
  .option(
    '--cp',
    'Search for checkpoint (CP) records instead of non-checkpoint'
  )
  .action(recordCommand);

program
  .command('help')
  .description('Show available commands')
  .action(() => {
    console.log(`
Available commands:
  kz-wr record <mapName>       - Look up world record for a map (Non-CP by default)
  kz-wr record <mapName> --cp  - Look up world record for a map (CP - with checkpoints)
  kz-wr help                   - Show this help message
  kz-wr --help                 - Show detailed help

Note: CP = with checkpoints, Non-CP = without checkpoints
    `);
  });

program.parse();
