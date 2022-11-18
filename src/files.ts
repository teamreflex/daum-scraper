import { createWriteStream, existsSync, mkdirSync } from "fs"
import { pipeline } from "stream"
import { promisify } from "util"
import retry from "async-retry"
import fetch from "node-fetch"

export const downloadImages = async (urls: string[], folder: string): Promise<void> => {
  makeFolder(folder)

  const result = await Promise.all(urls.map(url => saveImage(url, folder)))

  console.log(`Saved ${urls.length} images`)
}

const saveImage = async (url: string, path: string): Promise<boolean> => {
  const streamPipeline = promisify(pipeline);
  const filePath = `downloads/${path}/${url.split('/').pop()}.jpg`

  return await retry(
    async () => {
      const response = await fetch(url);
  
      if (response.body !== null) {
        const result = await streamPipeline(response.body, createWriteStream(filePath));
        return result === undefined
      } else {
        return false
      }
    },
    {
      retries: 3,
    }
  );
}

const makeFolder = (folder: string) => {
  return !existsSync(folder) && mkdirSync(folder, { recursive: true })
}