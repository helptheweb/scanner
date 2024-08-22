#! /usr/bin/env node

import { scanner } from "../dist/index.js";

const main = async () => {
  let output = await scanner('https://helptheweb.org');

  console.log(output);
}

main();