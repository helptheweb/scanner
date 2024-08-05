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