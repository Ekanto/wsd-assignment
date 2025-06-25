const TaskObjects = require('../pages/taskObjects');

class TaskActions {
    constructor(page) {
        this.page = page;
        this.pageObjects = new TaskObjects(page);
    }

    async openingHomePage() {
        console.log('Navigating to Home Page');
        await this.pageObjects.getHomePage();
        return this;
    }

    async selectSource() {
        console.log('Getting Flying From element');
        await this.pageObjects.getFlyingFrom().click();
        await this.pageObjects.getFlyingFromInputField()
        await this.pageObjects.getResultSpan()
        return this;
    }

    async selectDestination() {
        console.log('Selecting Destination');
        await this.pageObjects.getFlyingTo().click();
        await this.pageObjects.getFlyingToInputField();
        await this.pageObjects.getFlyingToResultSpan();
        return this;

    }
    
    // Other methods...
}

// Export the class, not an instance
module.exports = TaskActions;