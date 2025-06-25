const { test, expect } = require('@playwright/test');
const TaskActions = require('../tests/taskActions');



test('Flight booking test started', async ({ page }) => {
    const taskActions = new TaskActions(page);
    await taskActions.openingHomePage();
});

test('Select Flying From', async ({ page }) => {
    const taskActions = new TaskActions(page);
    await taskActions.openingHomePage(); // First navigate to the page
    await taskActions.selectSource(); // Then select the source
    // Wait for 4 seconds to ensure the page loads
});

test('Wait for page load', async ({ page }) => {
    const taskActions = new TaskActions(page);
    await taskActions.waitForPageLoad(); // First navigate to the page
 // Then wait for the page to load
    // Wait for 4 seconds to ensure the page loads
});