import { Cookie as PlaywrightCookie } from 'playwright'

export type Cookie = Omit<PlaywrightCookie, 'expires' | 'httpOnly' | 'secure' | 'sameSite'>