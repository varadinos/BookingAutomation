import { type Locator, type Page } from '@playwright/test';
import { filters } from '../test-data/dummy-data';

export class SearchResultPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

     get filterHotelCheckbox(): Locator {
        return this.page.getByLabel('Hotel').first();
    }

    get filterSection (): Locator { //try
        return this.page.locator('[data-filters-group="ht_id"]');
    }

    get hotelCheckbox(): Locator { //try
        return  this.filterSection.getByRole('checkbox', {name: /hotels?/i}).first();
  }


    get dismissSignIn(): Locator {
        return this.page.getByRole("button", { name: 'Dismiss sign-in info.' });
    }

    get seeAvailabilityButton(): Locator {
        return this.page.getByTestId("availability-cta-btn").nth(2);
    }

    get priceFilter(): Locator {
        return this.page.getByRole('slider', { name: 'Max.' });
    }

    async setHotelFilter(): Promise<void> {
        await this.hotelCheckbox.waitFor({state: "visible"});
        await this.hotelCheckbox.scrollIntoViewIfNeeded();
        await this.hotelCheckbox.click();
        await this.page.waitForLoadState('networkidle');
    }

     async setMaxPriceFilter(): Promise<void> {
        await this.priceFilter.waitFor({state: "visible"});
        await this.priceFilter.fill(filters.maxPrice);
        await this.page.waitForLoadState('networkidle');
    }

    async applyHotelFilters(): Promise<void> {
        await this.setMaxPriceFilter();
        await this.setHotelFilter();
    }

    async selectThirdHotel(): Promise<Page> {
        const context = await this.page.context();
        const pagePromise = context.waitForEvent('page');
        await this.seeAvailabilityButton.waitFor({state: "visible"});
        await this.seeAvailabilityButton.click();
        const hotelDetails = await pagePromise;
        await hotelDetails.waitForLoadState("load");
        return hotelDetails;
    }

   

}