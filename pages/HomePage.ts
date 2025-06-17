import { expect, type Locator, type Page } from '@playwright/test';
import * as dotenv from 'dotenv';
import { destination, guests }  from "../test-data/dummy-data";

dotenv.config();

export class HomePage {
    readonly page: Page;
    readonly url: string;

    constructor(page: Page) {
        this.page = page;
        this.url = process.env.BASE_URL!;
    }

    

    get destinationInput(): Locator {
        return this.page.getByPlaceholder("Where are you going?");
    }

    get dateSelector(): Locator {
        return this.page.getByTestId("searchbox-dates-container");
    }

    get nextMonthButton(): Locator {
        return this.page.getByRole("button", { name: "Next month" });
    }

    get guestSelector(): Locator {
        return this.page.getByTestId("occupancy-config");
    }

    get searchButton(): Locator {
        return this.page.getByRole("button", { name: "Search" });
    }

    get acceptCookiesButton(): Locator {
        return this.page.getByRole("button", { name: "Accept" });
    }

    get targetMonth(): Locator {
        return this.page.getByText(destination.targetMonth);
    }

    get checkInDate(): Locator {
        return this.page.getByRole("button", { name: destination.checkInDay });
    }

    get checkOutDate(): Locator {
        return this.page.getByRole("button", { name: destination.checkOutDay });
    }

    get searchResult(): Locator {
        return this.page.getByRole("button", { name: destination.searchResult });
    }

    get dismissSignIn(): Locator {
        return this.page.getByRole("button", { name: "Dismiss sign-in info." });
    }

    get adultsSection(): Locator {
        return this.page.locator('label[for="group_adults"]').locator('..').locator('..');
    }

    get minusButton(): Locator {
        return this.adultsSection.locator("button").first();
    }

    get plusButton(): Locator {
        return this.adultsSection.locator("button").nth(1);
    }

    get guestsValue(): Locator {
        return this.adultsSection.locator("span.e32aa465fd").first();
    }

    async goTo(): Promise<void> {
        await this.page.goto(this.url);
        await this.page.waitForLoadState('load');
    }

    async acceptCookies(): Promise<void> {
        await (this.acceptCookiesButton).waitFor({state: "visible"});
        await this.acceptCookiesButton.click();
    }

    async enterLocation(): Promise<void> {
        await this.destinationInput.waitFor({state: "visible"});
        await this.destinationInput.fill(destination.city)
        await this.searchResult.click();
    }

    async selectMonth(): Promise<void> {
        while (!(await this.targetMonth.isVisible())) {
            await this.nextMonthButton.click();
        }
    }

    async selectDates(): Promise<void> {
        await this.checkInDate.click();
        await this.checkOutDate.click();
    }


    async setOccupancy(): Promise<void> {
        const guestNumber = Number(guests.numberOfGuests);
        await this.guestSelector.click();
        await this.guestsValue.waitFor({ state: "visible" });
        let currentGuestValue = parseInt(await this.guestsValue.innerText())

        while (currentGuestValue !== guestNumber) {
            if (currentGuestValue > guestNumber) {
                await this.minusButton.click();
            } else {
                await this.plusButton.click();
            }
            currentGuestValue = parseInt(await this.guestsValue.innerText());
        }
    }


    async performSearch(): Promise<void> {
        await this.searchButton.click();
        await this.page.waitForLoadState("domcontentloaded")
    }

    async searchForLocation(): Promise<void> {
        await this.enterLocation();
        await this.selectMonth();
        await this.selectDates();
        await this.setOccupancy();
        await this.performSearch();
    }

}