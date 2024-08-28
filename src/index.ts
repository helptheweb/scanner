
import { generateReport, generateMultipleReports } from './generateReport';
import { displayResults } from './displayResults';
import { getUrlsFromSitemap } from './getUrlsFromSitemap';
import type { ReportInterface } from './types';

export const scanner = async (url: string): Promise<ReportInterface[]> => {

  let output: ReportInterface[] = [];

  if (url && URL.canParse(url)) {
    if (url.includes('.xml')) {
      const fullSitemap: string[] = await getUrlsFromSitemap(url);
      const reports = await generateMultipleReports(fullSitemap);
      for (let report of reports) {
        const formattedResults: ReportInterface = displayResults(report);
        output.push(formattedResults);
      }
    } else {
      const report = await generateReport(url);
      const formattedResults: ReportInterface = displayResults(report);
      output.push(formattedResults);
    }
  }

  return output;
};
