import chalk from 'chalk';
import { formatImpact } from './formatImpact';
import { ViolationInterface, ElementInterface, ReportInterface } from './types';
import { AxeResults, NodeResult } from 'axe-core';

export const displayResults = (report:ReportInterface):void => {
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
    violation.elements.forEach((element) => {
      console.log(element.source);
    });
  })
}

export const formatResults = (report:AxeResults):ReportInterface => {

  const violations:ViolationInterface[] = generateViolations(report);

  const reportObject = {
    url: report.url,
    timestamp: new Date().toISOString(),
    violations
  }

  return reportObject;
};

const generateElements = (elements:NodeResult[]):ElementInterface[] => {
  let elementArray:ElementInterface[] = [];
  elements.forEach((element) => {
    elementArray.push({
      source: element.html,
      failureSummary: element.failureSummary});
  });

  return elementArray;
};

const generateViolations = (report:AxeResults):ViolationInterface[] => {
  
  let combinedViolations:ViolationInterface[] = [];
  report.violations.forEach((violation) => {
    combinedViolations.push({
      id: violation.id,
      description: violation.description,
      impact: violation.impact,
      tags: violation.tags,
      help: violation.help,
      helpUrl: violation.helpUrl,
      elements: generateElements(violation.nodes)
    });
  });

  return combinedViolations;
};