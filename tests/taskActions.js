const TaskObjects = require("../pages/taskObjects");

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
    return this;
  }

  async selectDestination() {
    console.log("Selecting Destination Dhaka");
    await this.pageObjects.getFlyingTo().click();
    await this.pageObjects.getFlyingToInputField();
    await this.page.waitForTimeout(1000);
    await this.pageObjects.getFlyingToResultSpan().click(); // Wait for 2 seconds to ensure the selection is processed
    return this;
  }

  async selectDepartureDate() {
    console.log("Selecting Departure Date");
    await this.pageObjects.getDatePicker().evaluate((el) => {
      el.value = "Sep 25, 2025";
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));
    });
    console.log(
      "Departure Date Selected",
      await this.pageObjects.getDatePicker().inputValue()
    );

    return this;
  }

  async selectTravelerAndClass(){
    console.log("Selecting Traveler and Class");
    
  }



}

module.exports = TaskActions;
