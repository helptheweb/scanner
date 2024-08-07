
import { generateReport, generateReports } from './src/generateReport.js';
import { results } from './src/displayResults.js';
import { getUrlsFromSitemap } from './src/getUrlsFromSitemap.js';

export const scanner = async(url) => {

  let output = [];

  if(url && new URL(url)) {

    if(url.includes('.xml')) {
      const fullSitemap = await getUrlsFromSitemap(url);
      const reports = await generateReports(fullSitemap);
      for(let report of reports) {
        output.push(results(report));
      }
    } else {
      const report = await generateReport(url);
      output.push(results(report));
    }
  }

  return output;
};