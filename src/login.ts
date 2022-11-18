import { getFrame } from './common';
import { writeFileSync } from "fs";
import { chromium } from "playwright";

const selector = `#minidaum > ul > li:nth-child(10) > a`;

(async () => {
  const url = process.argv[2];

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  
  const page = await context.newPage();
  await page.goto(url);

  // wait 5 seconds for page to load
  await page.waitForTimeout(5000);

  // get iframe
  const frame = await getFrame(page);

  // wait 2 seconds for the login button to appear
  await frame.waitForSelector(selector, { timeout: 2000 });
  const element = await frame.locator(selector);
  const classes = await element.getAttribute('class');

  if (classes?.includes('login')) {
    await element.click();
  }

  // wait 5 minutes for a redirect back to daum
  await page.waitForNavigation({ timeout: 300000, url: (url: URL) => url.hostname === 'cafe.daum.net' });
  console.log('Redirected back to daum');
  console.log('Logged in, saving cookies');

  // write cookies to file
  const cookies = await page.context().cookies();
  const cookieJson = JSON.stringify(cookies);
  writeFileSync('cookies.json', cookieJson);
  console.log('Saved cookies, closing browser')
  
  await browser.close();
})();