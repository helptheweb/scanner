import type { ViolationInterface, ElementInterface, ReportInterface } from './types';
import type { AxeResults, NodeResult } from 'axe-core';

export const displayResults = (report:AxeResults):ReportInterface => {
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