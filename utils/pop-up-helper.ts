import { expect, Locator } from "@playwright/test";

export class PopupHelper {
  static async dismissPopup(locator: Locator,timeout: number): Promise<void> {
    try {
      await locator.waitFor({ state: 'visible', timeout: timeout });
      await locator.click();
      await expect(locator).not.toBeVisible({ timeout: timeout });
    } catch (e) {
      //console.log(e, "Popup not visible, nothing to do.");
    }
  }
}