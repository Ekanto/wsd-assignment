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

  getNextDatePicker(){
    return this.page.locator('(//button[@class="react-datepicker__navigation react-datepicker__navigation--next" and @aria-label="Next Month"])[1]')
  }

  getDesiredDate() {
    return this.page.getByRole('option', { name: 'Choose Thursday, September 25th,' })
  }

  getTravelerAndClass() {
    return this.page.locator('(//level[contains(.,"Traveler, Class")])[1]');
  }

  getSelectClass(){
    return this.page.getByRole('button', { name: 'Premium Economy' });
  }

  getTravellerSelectButton(){
    return this.page.locator('//div[@id="one-tab-pane"]//li[1]//div[1]//div[1]//div[2]//input[2]');
  }

  getConfirmButton(){
    return this.page.locator('(//button[contains(@class,"traveler_done_btn ")])[1]');
  }

  getSearchButton(){
    return this.page.locator('(//button[contains(@class,"search_btn")])[1]');
  }


  getLastFlightButton(){
    return this.page.locator('(//button[contains(@class,"btn_book_oneway")])[last()]')
  }

  getReviewFareModal(){
    return this.page.locator('//h5[contains(.,"Review fare to")]' )
  }

  getFareAmount(){
    return this.page.locator('//div[contains(@class, "total_a")]')

  }

  getLastFareFromPriceList(){
    return this.page.locator('(//span[contains(@class,"Flight_line_spacing")])[last()]');
  }

  getContinueButton(){
    return this.page.locator('//button[contains(.,"CONTINUE")]')
  }

  getCloseButton(){
    return this.page.getByRole('button', { name: 'Close' }).last();
  }

  getAllFares(){
    return this.page.locator('(//span[contains(@class,"Flight_line_spacing")])');
  }

   getNovoAir(){
    return this.page.getByRole('checkbox', { name: 'Novoair' });
  }


  getUSBangla(){
    return this.page.getByRole('checkbox', { name: 'US-Bangla Airlines' });
  }
}

module.exports = TaskObjects;
