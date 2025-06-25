const { baseURL } = require("../utils/test-setup-tools");

class TaskObjects {
  constructor(page) {
    this.page = page;
  }

  async getHomePage() {
    await this.page.goto(baseURL);
    return this;
  }

  getFlyingFrom() {
    return this.page.locator('(//level[contains(.,"Flying From")])[1]');
  }

  getFlyingFromInputField(){
    return this.page.locator('(//input[@placeholder="Leaving From"])[2]').fill('Chattogram');
  }

  getResultSpan(){
    return this.page.locator('(//body//div//div[@role="tabpanel"]//div//div//div//div[1]//div[1]//div[1]//div[1]//div[2]//div[2]//div[1]//span[1]').click();
  }

  getFlyingTo(){
    return this.page.locator('(//level[contains(.,"Flying To")])[1]');
  }

  getFlyingToInputField() {
    return this.page.locator('(//input[@placeholder="Arrival To"])[2]').fill('Dhaka');
  }

  getFlyingToResultSpan(){
    return this.page.locator('//body//div//div[@role="tabpanel"]//div//div//div//div[1]//div[1]//div[2]//div[1]//div[2]//div[2]//div[1]//span[1]').click();
  }

  getBookingPage() {
    return `${this.baseURL}/booking`;
  }
}

module.exports =  TaskObjects;
