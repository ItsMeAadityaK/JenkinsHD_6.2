const { Builder, By, Key, until } = require('selenium-webdriver');

async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to your application
        await driver.get('http://localhost:3000');

        // Example test: Check if the title contains 'React'
        let title = await driver.getTitle();
        console.log('Page title is: ' + title);
        if (title.includes('React')) {
            console.log('Title test passed');
        } else {
            console.log('Title test failed');
        }

        // Close the browser
        await driver.quit();
    } catch (error) {
        console.error('Error in test:', error);
    } finally {
        await driver.quit();
    }
}

example();
