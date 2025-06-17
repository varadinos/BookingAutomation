import { expect, type Locator, type Page } from '@playwright/test';

export class HotelDetailsPage {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }

    get reserveButtonTop(): Locator {
        return this.page.locator('#hp_book_now_button');
    }

    get reserveFinalButton(): Locator {
        return this.page.getByRole('button', { name: /I'll reserve|Request to book/i });
    }

    get roomSelector(): Locator {
        return this.page.getByTestId('select-room-trigger').first();
    }

    get loader(): Locator {
        return this.page.locator('.bui-button__loader .bui-spinner');
    }


    async waitForReserveButton(): Promise<void> {
        await expect(this.reserveButtonTop).toBeVisible();
    }

    async selectRoomAndReserve(): Promise<void> {
        await this.roomSelector.scrollIntoViewIfNeeded();
        await this.roomSelector.selectOption('1');
        await this.reserveFinalButton.click();
        await this.loader.waitFor({ state: "hidden", timeout: 10000 });

    }
}