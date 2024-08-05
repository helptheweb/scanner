import { AxePuppeteer } from 'axe-puppeteer';
import puppeteer from 'puppeteer';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'; // this is needed for ES6 imports for yargs
import chalk from 'chalk';

async function generateAccessibilityReport(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const results = await new AxePuppeteer(page).analyze();

  await browser.close();

  return results;
}

function generateImpact(impact) {

  let color = 'white';

  if(impact === 'minor') color ='cyan';
  if(impact === 'moderate') color ='yellow';
  if(impact === 'serious') color ='red';
  if(impact === 'critical') color ='bgRed';

  console.log(chalk.bold('Impact:') + ' ' + chalk[color](impact));
}

async function main() {
  const argv = yargs(hideBin(process.argv))
    .usage('Usage: node $0 [options]')
    .option('url', {
      alias: 'u',
      describe: 'Single URL to generate accessibility report for',
      type: 'string',
    })
    .option('sitemap', {
      alias: 's',
      describe: 'URL of the sitemap to generate accessibility reports for',
      type: 'string',
    })
    .option('output', {
      alias: 'o',
      describe: 'filename for the output',
      type: 'string',
    })
    .help('help')
    .alias('help', 'h')
    .default('url', 'https://www.helptheweb.org')
    .argv;

  const { url, sitemap } = argv;

  try {
    if (sitemap) {
      // Logic to handle sitemap input and generate reports for multiple URLs
      console.log('Generating accessibility reports for URLs in the sitemap:', sitemap);
      // Implement the logic to fetch URLs from the sitemap and generate reports
    } else {
      const report = await generateAccessibilityReport(url);

      console.log('Accessibility Report:');
      console.log('URL:', url);
      console.log('Timestamp:', new Date().toISOString());
      console.log('Violations:');

      report.violations.forEach((violation, index) => {
        console.log(chalk.bold.underline(`\nViolation ${index + 1}:`));
        console.log(chalk.bold('Description:') + ' ' + violation.description);
        generateImpact(violation.impact);
        console.log(chalk.bold('Help:') + ' ' + violation.help);
        console.log('Elements:');
        violation.nodes.forEach((node) => {
          console.log('  - HTML:', node.html);
        });
      });

      return report;
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();