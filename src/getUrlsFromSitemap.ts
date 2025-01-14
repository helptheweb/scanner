import axios from 'axios';
import xml2js from 'xml2js';

// Type definitions
interface SitemapUrl {
  loc: string[];
  lastmod?: string[];
  changefreq?: string[];
  priority?: string[];
}

interface Sitemap {
  loc: string[];
}

interface UrlSet {
  url: SitemapUrl[];
}

interface SitemapIndex {
  sitemap: Sitemap[];
}

interface ParsedXML {
  urlset?: UrlSet;
  sitemapindex?: SitemapIndex;
}

interface ErrorMessage {
  message: string;
}

const parser = new xml2js.Parser();

const reportError = ({ message }: ErrorMessage): void => {
  console.error(message);
}

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return String(error);
}

async function fetchSitemap(url: string): Promise<string | Error> {
  try {
    const response = await axios.get<string>(url);
    return response.data;
  } catch (error) {
    reportError({ message: getErrorMessage(error) });
    return error as Error;
  }
}

async function parseSitemap(xmlContent: string): Promise<ParsedXML | Error> {
  try {
    const result = await parser.parseStringPromise(xmlContent);
    return result as ParsedXML;
  } catch (error) {
    reportError({ message: getErrorMessage(error) });
    return error as Error;
  }
}

async function extractUrls(sitemapUrl: string, allUrls: Set<string> = new Set()): Promise<Set<string>> {
  const xmlContent = await fetchSitemap(sitemapUrl);
  if (xmlContent instanceof Error) return allUrls;

  const parsedContent = await parseSitemap(xmlContent);
  if (parsedContent instanceof Error) return allUrls;

  const { urlset, sitemapindex } = parsedContent;

  // Handle urlset URLs
  if (urlset?.url && Array.isArray(urlset.url)) {
    urlset.url.forEach((url: SitemapUrl) => {
      if (url.loc?.[0]) {
        allUrls.add(url.loc[0]);
      }
    });
  }

  // Handle sitemapindex URLs
  if (sitemapindex?.sitemap && Array.isArray(sitemapindex.sitemap)) {
    for (const sitemap of sitemapindex.sitemap) {
      if (sitemap.loc?.[0]) {
        await extractUrls(sitemap.loc[0], allUrls);
      }
    }
  }

  return allUrls;
}

export const getUrlsFromSitemap = async (sitemapUrl: string): Promise<string[]> => {
  console.log('Extracting URLs from sitemap...');
  const urls = await extractUrls(sitemapUrl);
  console.log(`Found ${urls.size} unique URLs:`);
  const urlList = Array.from(urls);
  return urlList;
}