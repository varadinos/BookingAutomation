import { test, expect } from '../fixtures/fixtures';
import { BookingDetailsPage } from '../pages/BookingDetailsPage';
import { HotelDetailsPage } from '../pages/HotelDetailsPage';
import { PopupHelper } from '../utils/pop-up-helper';



test("Booking.com reservation flow", async ({ homePage, searchResultPage }) => {
    //Part1: Navigating to booking.com and searching for Sofia as location, adding check-in/out dates and set the number of guests to 2.
    await homePage.goTo();
    await PopupHelper.dismissPopup(homePage.dismissSignIn, 2000);
    await homePage.acceptCookies();
    await homePage.searchForLocation();

    //Part2: Setting filter for hotels only and for max price 100 USD.
    await PopupHelper.dismissPopup(homePage.dismissSignIn, 3500);
    await searchResultPage.applyHotelFilters();

    //Part3: Select the third hotel and initiate the reservation process.
    const hotelPage = await searchResultPage.selectThirdHotel(); //new tab is opened
    const hotelDetailsPage = new HotelDetailsPage(hotelPage)
    await hotelDetailsPage.waitForReserveButton();
    await hotelDetailsPage.selectRoomAndReserve();

    //Part4: Adding guest information (names, email, phone etc).
    const bookingDetailsPage = new BookingDetailsPage(hotelPage);
    await bookingDetailsPage.fillUserDetails();
    await bookingDetailsPage.clickNextButton();

    //Part5: Verify that at least one payment-related element is visible (e.g., a field with “Cardnumber” or a title containing “Payment”) and make screenshot.
    await bookingDetailsPage.checkPaymentPageIsLoaded();
    
})
