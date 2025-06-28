const { test, expect } = require('@playwright/test');
const TaskActions = require('../tests/taskActions');



test('Flight booking test', async ({ page }) => {
    const taskActions = new TaskActions(page);
    await taskActions.openingHomePage();
    await taskActions.selectSource();  
    await taskActions.selectDestination();
    await taskActions.selectDepartureDate(); 
    await taskActions.selectTravelerAndClass();
    await taskActions.searchFlight();
    await taskActions.selectPreferedAirline();
    await taskActions.verifyFareAndTotalPrice();
    await taskActions.captureUSBanglaPrices();
    await taskActions.captureNovoAirPrices();



});



