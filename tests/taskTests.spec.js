const { test, expect } = require('@playwright/test');
const TaskActions = require('../tests/taskActions');



test('Flight booking test started', async ({ page }) => {
    const taskActions = new TaskActions(page);
    await taskActions.openingHomePage();
    await taskActions.selectSource();  
    await taskActions.selectDestination();
    await taskActions.selectDepartureDate(); 


});



