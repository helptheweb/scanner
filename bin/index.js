#! /usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'; // this is needed for ES6 imports for yargs

import { generateReport, generateReports } from '../src/generateReport.js';
import { displayResults } from '../src/displayResults.js';
import { getUrlsFromSitemap } from '../src/getUrlsFromSitemap.js';

const main = async () => {
  const argv = yargs(hideBin(process.argv))
    .usage('Usage: node $0 [options]')
    .option('url', {
      alias: 'u',
      describe: 'Single URL to generate accessibility report for',
      type: 'string',
    })
    .option('xml', {
      alias: 'x',
      describe: 'XML page to crawl',
      type: 'string',
    })
    .help('help')
    .alias('help', 'h')
    .argv;

  const { url, xml } = argv;

  try {

    // -u, -url
    if (url && new URL(url)) {
      const report = await generateReport(url);
      displayResults(report);
    };

    // -x, -xml
    if (xml && new URL(xml)) {
      const fullSitemap = await getUrlsFromSitemap(xml);
      const reports = await generateReports(fullSitemap);
      for(let report of reports) {
        displayResults(report);
      }
    }

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();