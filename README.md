# Web Accessibility Report Generator

This is a command-line tool that generates web accessibility reports for a single URL or multiple URLs from a sitemap. It uses the `axe-puppeteer` library to analyze web pages for accessibility issues and provides detailed reports on any violations found.

## Prerequisites

Before running the tool, make sure you have the following dependencies installed:

- Node.js (version 20 or above)
- npm (Node Package Manager)

## Installation

1. Clone the repository or download the source code.
2. Open a terminal and navigate to the project directory.
3. Run the following command to install the required dependencies:

   ```bash
   npm install
   ```

## Usage

### From package

To run the Web Accessibility Report Generator, use the following command:

```bash
scanner [options]
```

### Development

To run the Web Accessibility Report Generator, use the following command:

```bash
node bin/index.js [options]
```

### Options

- `--url` or `-u`: Specify a single URL to generate an accessibility report for.
- `--help` or `-h`: Display help information about the available options.

### Examples

- Generate a report for a single URL:

  ```bash
  node bin/index.js --url https://example.com
  ```

- Generate a report for the default URL (https://www.helptheweb.org) if no option is provided:

  ```bash
  node bin/index.js
  ```

## Output

The tool will generate accessibility reports and display them in the console. For each URL, the report includes:

- URL
- Timestamp
- Violations (if any)
  - Description
  - Impact
  - Help
  - Elements (HTML snippets)

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Disclaimer

This tool is provided as-is and may not catch all accessibility issues. It is recommended to use this tool in conjunction with manual testing and other accessibility evaluation methods to ensure comprehensive coverage.
