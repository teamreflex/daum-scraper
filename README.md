# daum-scraper
Scrape images from Daum posts.

## Requirements
- Node (only tested on 18)
- A Daum/Kakao account
- Access to the content you're trying to scrape

## Setup
```bash
$ git clone git@github.com:teamreflex/daum-scraper.git
$ cd daum-scraper
$ npm install
```

## Running
First you must login to generate a `cookies.json` file. Provide a link to the cafe/post you're wanting to access. This will bring up a Chromium instance for you to login.
```bash
$ npm run login -- <url>
```

Once that's done and you have your `cookies.json` file saved, you can start scraping.
```bash
$ npm start -- <url>
$ npm start -- https://cafe.daum.net/loonatheworld/F5dr/37
> Loaded cookies
> Found 33 images
> Saved 33 images
```