import { AxePuppeteer } from '@axe-core/puppeteer';
// import puppeteer, { type LaunchOptions } from 'puppeteer';
import puppeteer, { type LaunchOptions, type Page } from 'puppeteer';

// Helper function to wait for animations
const waitForAnimationsToComplete = async (page: Page) => {
  await page.waitForNetworkIdle({
    idleTime: 500,
    timeout: 30000
  });

  // More efficient scrolling
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      const distance = 250;  // Increased scroll distance
      const scrollInterval = 50;  // Faster scrolling

      const timer = setInterval(() => {
        window.scrollBy(0, distance);

        if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, scrollInterval);

      // Backup timeout
      setTimeout(() => {
        clearInterval(timer);
        window.scrollTo(0, 0);
        resolve();
      }, 5000);
    });
  });

  // Animation check with shorter timeout
  await page.evaluate(() => {
    return new Promise((resolve) => {
      const checkAnimations = () => {
        const elements = document.querySelectorAll('*');
        const animatingElements = Array.from(elements).filter(el => {
          const style = window.getComputedStyle(el);
          return (
            style.animation !== 'none' ||
            style.transition !== 'all 0s ease 0s' ||
            style.transform.includes('matrix')
          );
        });

        if (animatingElements.length === 0) {
          resolve(true);
        } else {
          requestAnimationFrame(checkAnimations);
        }
      };
      checkAnimations();
      setTimeout(() => resolve(true), 5000);  // Reduced from 10000
    });
  });
};

// Launches Puppeteer and runs the Axe Reporter for a SINGLE URL
export const generateReport = async (url: string, puppeteerLaunchOptions?: LaunchOptions, hasDelay?: boolean): Promise<any> => {

  const browser = await puppeteer.launch({
    ...puppeteerLaunchOptions
  });
  const page = await browser.newPage();

  await page.goto(url);
  hasDelay && await waitForAnimationsToComplete(page);
  const results = await new AxePuppeteer(page).analyze();

  await browser.close();

  return results;
}

// If the supplied URL is an array of URLs, parse through it
export const generateMultipleReports = async (urls: string[], puppeteerLaunchOptions?: LaunchOptions, hasDelay?: boolean): Promise<any[]> => {

  const browser = await puppeteer.launch({
    ...puppeteerLaunchOptions
  });
  const page = await browser.newPage();
  let combinedResults = [];
  for (let url of urls) {
    console.log(url);
    await page.goto(url);
    hasDelay && await waitForAnimationsToComplete(page);
    const results = await new AxePuppeteer(page).analyze();
    combinedResults.push(results);
  };
  await browser.close();

  return combinedResults;
}