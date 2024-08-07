import { AxePuppeteer } from 'axe-puppeteer';
import puppeteer from 'puppeteer';

export const generateReport = async(url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const results = await new AxePuppeteer(page).analyze();

  await browser.close();

  return results;
}

export const generateReports = async(urls) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let combinedResults = [];
  for(let url of urls) {
    console.log(url);
    await page.goto(url);
    const results = await new AxePuppeteer(page).analyze();
    combinedResults.push(results);
  };
  await browser.close();

  return combinedResults;
}