const { baseURL } = require("../utils/test-setup-tools");

class TaskObjects {
  constructor(page) {
    this.page = page;
  }

  async getHomePage() {
    await this.page.goto(baseURL, { waitUntil: "domcontentloaded" });
    return this;
  }

  getFlyingFrom() {
    return this.page.locator('(//level[contains(.,"Flying From")])[1]');
  }

  getFlyingFromInputField() {
    return this.page
      .locator('(//input[@placeholder="Leaving From"])[2]')
      .fill("Chattogram");
  }

  getResultSpan() {
    return this.page.locator('span:has-text("Chattogram")');
  }

  getFlyingTo() {
    return this.page.locator('(//level[contains(.,"Flying To")])[1]');
  }

  getFlyingToInputField() {
    return this.page
      .locator('(//input[@placeholder="Arrival To"])[2]')
      .fill("Dhaka");
  }

  getFlyingToResultSpan() {
    return this.page.locator('//div[@id="one-tab-pane"]//div[2]//div[1]//div[2]//div[2]//div[1]//span[1]');
  }

  getDatePicker() {
    return this.page.locator('(//input[@class = "" and @type = "text"])[1]');
  }

  getTravelerAndClass() {
    return this.page.locator('(//level[contains(.,"Traveler, Class")])[1]');
  }

  getSelectClass(){
    return this.page.getByRole('button', { name: 'Premium Economy' });
  }
}

module.exports = TaskObjects;
