import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'; // this is needed for ES6 imports for yargs

import { generateReport } from './src/generateReport.js';
import { displayResults } from './src/displayResults.js';

const main = async () => {
  const argv = yargs(hideBin(process.argv))
    .usage('Usage: node $0 [options]')
    .option('url', {
      alias: 'u',
      describe: 'Single URL to generate accessibility report for',
      type: 'string',
    })
    .help('help')
    .alias('help', 'h')
    .default('url', 'https://www.helptheweb.org')
    .argv;

  const { url } = argv;

  try {
    if (url) {
      const report = await generateReport(url);
      displayResults(report, url);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();