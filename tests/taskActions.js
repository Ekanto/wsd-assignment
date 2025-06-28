const { strict } = require("assert");
const TaskObjects = require("../pages/taskObjects");
const { expect } = require("@playwright/test");

class TaskActions {
  constructor(page) {
    this.page = page;
    this.pageObjects = new TaskObjects(page);
  }

  async openingHomePage() {
    console.log("Navigating to Home Page");
    await this.pageObjects.getHomePage();
    return this;
  }

  async selectSource() {
    console.log("Selecting Chattogram as departure place");
    await this.pageObjects.getFlyingFrom().click();
    await this.pageObjects.getFlyingFromInputField();
    await this.pageObjects.getResultSpan().click();
    console.log("Departure place Selected");
  }

  async selectDestination() {
    console.log("Selecting Destination Dhaka");
    await this.pageObjects.getFlyingTo().click();
    await this.pageObjects.getFlyingToInputField();
    await this.page.waitForTimeout(1000);
    await this.pageObjects.getFlyingToResultSpan().click(); // Wait for 2 seconds to ensure the selection is processed
  }

async selectDepartureDate() {
  console.log("Selecting Departure Date");
  await this.page.waitForTimeout(2000);

  await this.pageObjects.getDatePicker().click();
  
  await this.page.waitForTimeout(500);
  
  const targetMonth = "SEPTEMBER 2025";
  
  let currentMonthText = await this.page.locator('(//span[@class="react-datepicker__current-month"])[1]').innerText();
  console.log(`Current month in date picker: ${currentMonthText}`);
  
  let attempts = 0;
  const maxAttempts = 24; 
  
  while (!currentMonthText.includes(targetMonth) && attempts < maxAttempts) {
    console.log(`Clicking next month button, currently at: ${currentMonthText}`);
    await this.pageObjects.getNextDatePicker().click();
    await this.page.waitForTimeout(300);
    
    currentMonthText = await this.page.locator('(//span[@class="react-datepicker__current-month"])[1]').innerText();
    attempts++;
  }
  
  if (attempts >= maxAttempts) {
    console.error("Could not find September 2025 after many attempts");
    throw new Error("Failed to navigate to September 2025");
  }
  
  console.log(`Found ${targetMonth}, now selecting the 25th`);
  
  await this.pageObjects.getDesiredDate().click();
  
  await this.page.waitForTimeout(1000);
  
  const selectedDate = await this.pageObjects.getDatePicker().inputValue();
  console.log(`Selected date: ${selectedDate}`);
  
  console.log("Departure Date Selected");
  return this;
}

  async selectTravelerAndClass() {
    console.log("Selecting Traveler and Class");
    await this.pageObjects.getTravelerAndClass().click();
    console.log("Selecting Premium Economy Class");
    await this.pageObjects.getSelectClass().click();
    console.log("Selecting Travellers . .");
    await this.pageObjects.getTravellerSelectButton().click();
    console.log("Confirming Selection");
    await this.pageObjects.getConfirmButton().click();
    console.log("Traveler and Class Selection Completed");
  }

  async searchFlight() {
    await this.pageObjects.getSearchButton().click();
  }

  async selectPreferedAirline() {
    console.log("Selecting US Bangla Airways");
    await this.pageObjects.getUSBangla().click();
    console.log("US Bangla Airways Selected");
    await this.page.keyboard.press("PageDown");
    console.log("Getting fare from the last flight");
    this.fareAmountFromPriceList = await this.pageObjects
      .getLastFareFromPriceList()
      .innerText();
    console.log("Fare Amount from Price List: ", this.fareAmountFromPriceList);
    await this.pageObjects.getLastFlightButton().click();
  }

  async verifyFareAndTotalPrice() {
    console.log("Verifying Fare and Total Price");
    await expect(
      this.pageObjects.getReviewFareModal(),
      "Review fare modal should be visible"
    ).toBeVisible();
    console.log("Review fare modal is visible");
    console.log("Getting the fare amount from modal");
    const fareAmount = await this.pageObjects.getFareAmount().innerText();
    console.log("Fare Amount: ", fareAmount);
    console.log("Verifying with the price in flight list");
    await this.page.waitForTimeout(5000);
    await expect(this.fareAmountFromPriceList).toEqual(fareAmount);
    console.log("Fare and Total Price Verified Successfully");
    console.log("Verify done. Going to next page");
    await this.pageObjects.getContinueButton().click();
    await this.pageObjects.getCloseButton().click();
    console.log("Closing the sign in modal");
  }

  /**
   * @param {string} airlineName
   * @returns {Promise<number[]>}
   */
  async captureFlightPrices(airlineName) {
    console.log(`Capturing ${airlineName} price details`);

    // Select the appropriate airline checkboxw
    if (airlineName === "US-Bangla") {
      console.log("Selecting US-Bangla Airways");
      await this.pageObjects.getUSBangla().scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(1000);
    } else if (airlineName === "Novo Air") {
      await this.pageObjects.getNovoAir().click();
      await this.page.waitForTimeout(1000);
    } else {
      console.log(`Airline ${airlineName} not recognized`);
      return [];
    }

    console.log(`${airlineName} Selected`);

    const priceElements = this.pageObjects.getAllFares();
    const count = await priceElements.count();
    console.log(`Found ${count} flight prices`);

    const prices = [];
    for (let i = 0; i < count; i++) {
      const priceText = await priceElements.nth(i).innerText();
      const cleanPrice = priceText.replace(/[^0-9]/g, "");
      prices.push(parseInt(cleanPrice, 10));
      console.log(`Flight ${i + 1}: ${priceText} (${cleanPrice})`);
    }

    console.log(`Captured all ${airlineName} flight prices:`, prices);

    this[`${airlineName.replace(/\s+/g, "")}Prices`] = prices;

    if (airlineName === "US-Bangla") {
      await this.pageObjects.getUSBangla().click();
    }

    return prices;
  }

  async captureUSBanglaPrices() {
    return this.captureFlightPrices("US-Bangla");
  }

  async captureNovoAirPrices() {
    return this.captureFlightPrices("Novo Air");
  }
}

module.exports = TaskActions;
