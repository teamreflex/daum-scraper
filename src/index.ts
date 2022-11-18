import { downloadImages } from './files';
import { getFrame, getFolder } from './common';
import { readFileSync, writeFileSync } from "fs";
import { chromium, Cookie } from "playwright";

const selector = `.txc-image-grid`;

(async () => {
  const url = process.argv[2];

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  // load cookies
  let cookies: Cookie[];
  try {
    const loadedCookies = readFileSync('cookies.json', 'utf8');
    cookies = JSON.parse(loadedCookies);
    console.log('Loaded cookies');
  } catch (e) {
    console.log('Could not load cookies');
    await browser.close();
    return;
  }

  await context.addCookies(cookies);
  const page = await context.newPage();
  await page.goto(url);

  // get iframe
  const frame = await getFrame(page);

  // wait 5 seconds for the first image
  await frame.waitForSelector(selector, { timeout: 50000 });

  // round up all the images
  const images: string[] = await frame.$$eval(selector, nodes => {
    return nodes.map(node => node.getAttribute(`src`));
  })
  console.log(`Found ${images.length} images`);

  await browser.close();

  // download them
  await downloadImages(images, getFolder(url));
})();