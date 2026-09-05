const { test, expect } = require('@playwright/test');

test('Dropdowns handling', async ({ page }) => {
    await page.goto("https://www.webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html");
    const course_dd = page.locator("xpath=//select[@id='dropdowm-menu-1']");
    await course_dd.selectOption('Python');
    await expect(course_dd).toBeVisible('Python');
   
    const ide_dd = page.locator("xpath=//select[@id='dropdowm-menu-2']");
    await ide_dd.selectOption({value:'junit'});
    await expect(ide_dd).toBeVisible('JUnit');

    const frontend_dd = page.locator("xpath=//select[@id='dropdowm-menu-3']");
    await frontend_dd.selectOption({value:'javascript'});
    await expect(frontend_dd).toBeVisible('JavaScript');

    //Radio BUttons
    const radio_button =  page.locator("xpath=//input[@value='yellow']");
    await radio_button.click();
    await expect(radio_button).toBeChecked();

    //check boxes
    const check_box = page.locator("xpath=//input[@value='option-1']");
    check_box.check();
    await expect(check_box).toBeChecked();

    const check_box2 = page.locator("xpath=//input[@value='option-2']");
    check_box2.check();
    await expect(check_box2).toBeChecked();

    //Selected and disabled text
    const radio_1 = page.locator("xpath=//input[@value='cabbage']");
    await expect(radio_1).toBeDisabled();
    const selected_dd = page.locator("xpath=//*[@id='fruit-selects']");
    await expect(selected_dd).toBeVisible('Grape');
});

