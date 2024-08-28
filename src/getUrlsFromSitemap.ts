import axios from 'axios';
import xml2js from 'xml2js';

const parser = new xml2js.Parser();

// Log the errors
const reportError = ({ message }: { message: string }) => {
  console.error(message);
}

// Safe typing for erroring
const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message
  return String(error)
}

// Get the sitemap from the XML url
async function fetchSitemap(url: string) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    reportError({ message: getErrorMessage(error) })
    return error;
  }
}

// Parse the XML file to extract all of the "actual" URLs
async function parseSitemap(xmlContent: any) {
  try {
    const result = await parser.parseStringPromise(xmlContent);
    return result;
  } catch (error) {
    reportError({ message: getErrorMessage(error) })
    return error;
  }
}

// If the supplied URL is actually XML, parse through it. Otherwise, supply an array of URLs
async function extractUrls(sitemapUrl: string, allUrls = new Set()) {
  const xmlContent = await fetchSitemap(sitemapUrl);
  if (!xmlContent) return allUrls;

  const parsedContent = await parseSitemap(xmlContent);
  if (!parsedContent) return allUrls;

  const urlset = parsedContent.urlset;
  const sitemapindex = parsedContent.sitemapindex;

  // We're looking for the <loc> object in the XML files since those are the actual URLs
  if (urlset && urlset.url) {
    urlset.url.forEach((xmlObj: { loc: string[]; }) => {
      if (xmlObj.loc && xmlObj.loc[0]) {
        allUrls.add(xmlObj.loc[0]);
      }
    });
  }

  if (sitemapindex && sitemapindex.sitemap) {
    for (const sitemap of sitemapindex.sitemap) {
      if (sitemap.loc && sitemap.loc[0]) {
        await extractUrls(sitemap.loc[0], allUrls);
      }
    }
  }

  return allUrls;
}

// Exported function to get all of the "actual" URLs from the sitemap (XML file)
export const getUrlsFromSitemap = async (sitemapUrl: string): Promise<string[]> => {

  console.log('Extracting URLs from sitemap...');
  const urls = await extractUrls(sitemapUrl);

  console.log(`Found ${urls.size} unique URLs:`);
  const urlList: string[] = Array.from(urls.toString());

  return urlList;
}
