import { test as base } from '@playwright/test';
import playwright from 'playwright';
import * as dotenv from 'dotenv';

dotenv.config();

import { HomePage } from '../pages/HomePage';
import { SearchResultPage } from '../pages/SearchResultPage';





type Fixtures = {
  homePage: HomePage;
  searchResultPage: SearchResultPage;
};

export const test = base.extend<Fixtures>({
  browser: async ({ }, use) => {
    const browser = await playwright.chromium.launch({ headless: true });
    await use(browser);
    await browser.close();
  },

  page: async ({ browser }, use) => {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
    });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  searchResultPage: async ({ page }, use) => {
    const searchResultPage = new SearchResultPage(page);
    await use(searchResultPage);
  },

})

export { expect } from '@playwright/test';