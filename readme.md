# Booking.com Automation with Playwright

This is an end-to-end automation project for Booking.com using [Playwright](https://playwright.dev/) with **TypeScript** and **Page Object Model (POM)** design pattern.
---

## Project Structure

```
.
├── fixtures/                   # Playwright fixtures setup
├── pages/                      # Page Object Model classes
├── playwright-report/          # HTML test report output
├── screenshots/                # Screenshots from test runs
├── test-data/                  # Dummy data for test inputs
├── test-results/               # Raw test results (JSON, trace, etc.)
├── tests/                      # Test specs
├── utils/                      # Utility helpers (e.g., popup handling)
├── .env                        # Environment variables
├── package.json
├── playwright.config.ts       # Playwright configuration
└── tsconfig.json              # TypeScript configuration
```

---

## Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/Varadinos/BookingAutomation.git
cd BookingAutomation
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Environment Variables

Create a `.env` file in the root directory and populate it with:

```env
BASE_URL=*the URL of the website you want the tests to run against*
```

---

## Running the Tests

### Run all tests:

```bash
npx playwright test
```

### Open the HTML report:

```bash
npx playwright show-report
```

---

## Additional Notes

- Uses **TypeScript** for type safety and scalability.
- Test data is managed via `test-data/dummy-data.ts`.
- Page elements and actions are abstracted using the **Page Object Model** pattern.
- Screenshots and HTML reports are saved after every run for debugging.

---

