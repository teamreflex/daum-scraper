import { Frame, Page } from "playwright";

export const getFrame = async (page: Page): Promise<Frame> => {
  // get iframe
  const handle = await page.$('#down');
  if (!handle) {
    throw new Error('Could not find iframe (handle)');
  }
  const contentFrame = await handle.contentFrame();
  if (!contentFrame) {
    throw new Error('Could not find iframe (contentFrame)');
  }

  return contentFrame;
}

export const getFolder = (url: string): string => {
  const parts = url.split('/');
  const name = parts[parts.length - 3];
  const num = parts[parts.length - 1];
  return `${name}_${num}`;
}