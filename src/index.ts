
import { generateReport, generateReports } from './generateReport';
import { formatResults } from './displayResults';
import { getUrlsFromSitemap } from './getUrlsFromSitemap';
import { ReportInterface } from './types';

export const scanner = async(url:string):Promise<ReportInterface[]> => {

  let output:ReportInterface[] = [];

  if(url && URL.canParse(url)) {
    if(url.includes('.xml')) {
      const fullSitemap:string[] = await getUrlsFromSitemap(url);
      const reports = await generateReports(fullSitemap);
      for(let report of reports) {
        const formattedResults:ReportInterface = formatResults(report);
        output.push(formattedResults);
      }
    } else {
      const report = await generateReport(url);
      const formattedResults:ReportInterface = formatResults(report);
      output.push(formattedResults);
    }
  }

  return output;
};
