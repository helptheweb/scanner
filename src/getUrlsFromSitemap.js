import axios from 'axios';
import xml2js from 'xml2js';
import fs from 'fs';

const parser = new xml2js.Parser();

async function fetchSitemap(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching sitemap from ${url}:`, error.message);
    return null;
  }
}

async function parseSitemap(xmlContent) {
  try {
    const result = await parser.parseStringPromise(xmlContent);
    return result;
  } catch (error) {
    console.error('Error parsing XML:', error.message);
    return null;
  }
}

async function extractUrls(sitemapUrl, allUrls = new Set()) {
  const xmlContent = await fetchSitemap(sitemapUrl);
  if (!xmlContent) return allUrls;

  const parsedContent = await parseSitemap(xmlContent);
  if (!parsedContent) return allUrls;

  const urlset = parsedContent.urlset;
  const sitemapindex = parsedContent.sitemapindex;

  if (urlset && urlset.url) {
    urlset.url.forEach(urlObj => {
      if (urlObj.loc && urlObj.loc[0]) {
        allUrls.add(urlObj.loc[0]);
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

export const getUrlsFromSitemap = async(sitemapUrl) => {

  console.log('Extracting URLs from sitemap...');
  const urls = await extractUrls(sitemapUrl);
  
  console.log(`Found ${urls.size} unique URLs:`);
  const urlList = Array.from(urls);

  return urlList;
}
