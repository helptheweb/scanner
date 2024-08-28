import type { ViolationInterface, ElementInterface, ReportInterface } from './types';
import type { AxeResults, NodeResult } from 'axe-core';

// Generates the return value
export const displayResults = (report: AxeResults): ReportInterface => {
  const violations: ViolationInterface[] = generateViolations(report);
  const reportObject = {
    url: report.url,
    timestamp: new Date().toISOString(),
    violations
  }

  return reportObject;
};

// Generates the "Elements" (source HTML + Summary of error)
const generateElements = (elements: NodeResult[]): ElementInterface[] => {
  let elementArray: ElementInterface[] = [];
  elements.forEach((element) => {
    elementArray.push({
      source: element.html,
      failureSummary: element.failureSummary
    });
  });

  return elementArray;
};

// Generates the overall "Violations" from the Axe Results object
// If there are new values that are needed by the frontend, this is probably where they would need to get added
const generateViolations = (report: AxeResults): ViolationInterface[] => {
  let combinedViolations: ViolationInterface[] = [];
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