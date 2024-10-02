const { Builder, By, until } = require('selenium-webdriver');

async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to your React app
        await driver.get('http://localhost:3000');

        // Wait until the title contains "React"
        let title = await driver.getTitle();
        console.log('Page title is: ' + title);

        // Check if the title includes 'React'
        if (title.includes('React')) {
            console.log('Title test passed');
        } else {
            console.log('Title test failed');
        }
    } catch (error) {
        console.error('Error during test execution: ', error);
    } finally {
        // Ensure the driver quits regardless of success or failure
        await driver.quit();
    }
}

example();
