# Web Accessibility Report Generator

This is a command-line tool that generates web accessibility reports for a single URL or multiple URLs from a sitemap. It uses the `axe-puppeteer` library to analyze web pages for accessibility issues and provides detailed reports on any violations found.

## Prerequisites

Before running the tool, make sure you have the following dependencies installed:

- Node.js (version 20 or above)
- Bun

## Installation

1. Clone the repository or download the source code.
2. Open a terminal and navigate to the project directory.
3. Run the following command to install the required dependencies:

```bash
bun install
```

## Usage

First, generate the dist files with `npm run build`

This should output the compiled files to the `dist` directory

Afterwards, use the sandbox file to generate anything you'll need. By default, we'll get the entire set of results from helptheweb.org

`node bin/sandbox.js`

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
