#! /usr/bin/env node

import { scanner } from "../dist/index.js";
import fs from 'fs';

const main = async () => {
  const output = await scanner('https://www.helptheweb.org');

  fs.writeFile("output.json", JSON.stringify(output), () => console.log('Report logged to output.json'));
}

main();