import { AxePuppeteer } from '@axe-core/puppeteer';
import puppeteer, { type LaunchOptions } from 'puppeteer';

// Launches Puppeteer and runs the Axe Reporter for a SINGLE URL
export const generateReport = async (url: string, puppeteerLaunchOptions?: LaunchOptions): Promise<any> => {

  const browser = await puppeteer.launch({
    ...puppeteerLaunchOptions
  });
  const page = await browser.newPage();

  await page.goto(url);
  const results = await new AxePuppeteer(page).analyze();

  await browser.close();

  return results;
}

// If the supplied URL is an array of URLs, parse through it
export const generateMultipleReports = async (urls: string[], puppeteerLaunchOptions?: LaunchOptions): Promise<any[]> => {

  const browser = await puppeteer.launch({
    ...puppeteerLaunchOptions
  });
  const page = await browser.newPage();
  let combinedResults = [];
  for (let url of urls) {
    console.log(url);
    await page.goto(url);
    const results = await new AxePuppeteer(page).analyze();
    combinedResults.push(results);
  };
  await browser.close();

  return combinedResults;
}