import { expect, FrameLocator, type Locator, type Page } from '@playwright/test';
import { user } from '../test-data/dummy-data';

export class BookingDetailsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }


    get userDetailsContainer(): Locator {
        return this.page.getByTestId("user-details-container");
    }

    get firstNameField(): Locator {
        return this.page.getByTestId("user-details-firstname");
    }

    get lastNameField(): Locator {
        return this.page.getByTestId("user-details-lastname");
    }

    get emailField(): Locator {
        return this.page.getByTestId("user-details-email");
    }

    get countryDropdown(): Locator {
        return this.page.getByTestId("user-details-cc1");
    }

    get phoneNumberField(): Locator {
        return this.page.getByTestId("phone-number-input");
    }

    get nextButton(): Locator {
        return this.page.getByRole('button', { name: 'Next: Final details' });
    }

    get loader(): Locator {
        return this.page.locator('.bui-button__loader .bui-spinner');
    }

    get addressField(): Locator {
        return this.page.getByTestId("user-details-address1");
    }

    get cityField(): Locator {
        return this.page.getByTestId("user-details-city");
    }

    get userDetailsContainer2(): Locator {
        return this.page.getByTestId("user-details");
    }

    get firstNameField2(): Locator {
        return this.page.locator('input[name="firstname"]');
    }

    get lastNameField2(): Locator {
        return this.page.locator('input[name="lastname"]');
    }

    get emailField2(): Locator {
        return this.page.locator('input[name="email"]');
    }

    get emailField3(): Locator {
        return this.page.locator('input[name="emailConfirm"]');
    }

    get phoneNumberField2(): Locator {
        return this.page.locator('input[name="phone__number"]');
    }

    get paymentIFrame(): FrameLocator {
        return this.page.frameLocator('iframe[title="Payment"]');
    }

    get paymentLabels(): Locator {
        return this.paymentIFrame.getByRole('heading', { name: "How do you want to pay?" })
    }

    get noPaymentLabel(): Locator {
        return this.page.getByRole('heading', { name: "No payment details required" })
    }

    async fillUserDetails(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded')
        if (await (this.userDetailsContainer2).isVisible()) {
            await this.firstNameField2.fill(user.firstName);
            await this.lastNameField2.fill(user.lastName);
            await this.emailField2.fill(user.email);
            await this.emailField3.fill(user.email);
            await this.phoneNumberField2.fill(user.phone);
        } else {
            await this.firstNameField.fill(user.firstName);
            await this.lastNameField.fill(user.lastName);
            await this.emailField.fill(user.email);
            await this.countryDropdown.selectOption(user.country);
            await this.phoneNumberField.fill(user.phone);
            await this.fillIfVisible(this.addressField, user.address);
            await this.fillIfVisible(this.cityField, user.city);
        }

    }

    async clickNextButton(): Promise<void> {
        await this.nextButton.scrollIntoViewIfNeeded();
        await this.nextButton.click();
        await this.loader.waitFor({ state: "hidden", timeout: 10000 });
    }

    async checkPaymentPageIsLoaded(): Promise<void> {
        if (await this.paymentLabels.isVisible()) {
            await expect(this.paymentLabels).toBeVisible();
        } else if (await this.noPaymentLabel.isVisible()) {
            await expect(this.noPaymentLabel).toBeVisible();
        }

        await this.page.waitForLoadState("networkidle");
        await this.page.screenshot({ path: 'screenshots/payment-page.png', fullPage: true });
    }

    async fillIfVisible(locator: Locator, value: string): Promise<void> {
        if (await locator.isVisible()) {
            await locator.scrollIntoViewIfNeeded();
            await locator.fill(value);
        }
    }

}