
import { generateReport, generateReports } from './src/generateReport.js';
import { results } from './src/displayResults.js';
import { getUrlsFromSitemap } from './src/getUrlsFromSitemap.js';

export const scanner = async(url, xml) => {

  let output;

  if(url && new URL(url)) {
    const report = await generateReport(url);
    output = results(report);
  }

  if (xml && new URL(xml)) {
    const fullSitemap = await getUrlsFromSitemap(xml);
    const reports = await generateReports(fullSitemap);
    for(let report of reports) {
      output = results(report);
    }
  }

  return output;

}