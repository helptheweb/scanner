import chalk from 'chalk';
import { formatImpact } from './formatImpact.js';

export const displayResults = (report) => {
  console.log('\n\n======================');
  console.log('Accessibility Report:');
  console.log('URL:', report.url);
  console.log('Timestamp:', new Date().toISOString());
  console.log('Violations:');

  report.violations.forEach((violation, index) => {
    console.log(chalk.bold.underline(`\nViolation ${index + 1}:`));
    console.log(chalk.bold('Description:') + ' ' + violation.description);
    formatImpact(violation.impact);
    console.log(chalk.bold('Help:') + ' ' + violation.help);
    console.log('Elements:');
    violation.nodes.forEach((node) => {
      console.log('  - HTML:', node.html);
    });
  })
}