
import { generateReport, generateMultipleReports } from './generateReport';
import { displayResults } from './displayResults';
import { getUrlsFromSitemap } from './getUrlsFromSitemap';
import type { ReportInterface } from './types';
import { type LaunchOptions } from 'puppeteer';
import { formatUrl } from './formatURL';

export const scanner = async (url: string, puppeteerLaunchOptions?: LaunchOptions, hasDelay?: boolean): Promise<ReportInterface[]> => {

  let output: ReportInterface[] = [];

  let formattedURL = formatUrl(url);
  console.log(formattedURL);

  if (formattedURL) {
    if (url.includes('.xml')) {
      const fullSitemap: string[] = await getUrlsFromSitemap(formattedURL);
      const reports = await generateMultipleReports(fullSitemap, puppeteerLaunchOptions, hasDelay);
      for (let report of reports) {
        const formattedResults: ReportInterface = displayResults(report);
        output.push(formattedResults);
      }
    } else {
      const report = await generateReport(formattedURL, puppeteerLaunchOptions, hasDelay);
      const formattedResults: ReportInterface = displayResults(report);
      output.push(formattedResults);
    }
  }

  return output;
};

export const arrayScanner = async (urls: string[], puppeteerLaunchOptions?: LaunchOptions, hasDelay = false): Promise<ReportInterface[]> => {
  let output: ReportInterface[] = [];

  if (urls) {
    const reports = await generateMultipleReports(urls, puppeteerLaunchOptions, hasDelay);
    for (let report of reports) {
      const formattedResults: ReportInterface = displayResults(report);
      output.push(formattedResults);
    }
  }

  return output;
}