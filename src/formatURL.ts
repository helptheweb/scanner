export const formatUrl = (input: string): string => {
  // Remove leading/trailing whitespace
  let url = input.trim();

  // Handle protocol
  if (!url.match(/^[a-zA-Z]+:\/\//)) {
    url = 'https://' + url;
  }

  // Handle paths
  if (!url.includes('/', url.indexOf('://') + 3)) {
    url += '/';
  }

  try {
    // Test if URL is valid
    new URL(url);
    return url;
  } catch (error) {
    throw new Error(`Invalid URL: ${input}`);
  }
}