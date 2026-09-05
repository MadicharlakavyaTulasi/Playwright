const { test, expect } = require('@playwright/test');

test("multi dropdown",async({page})=>{
    await page.goto("https://www.lambdatest.com/selenium-playground/select-dropdown-demo");
    const day_dropdown = page.locator("#select-demo");
    await day_dropdown.selectOption('Wednesday');
    const text = page.locator(".selected-value")
    await expect(text).toContainText("Day selected");
    const innertext = await text.innerText();
    console.log(innertext);
    // const multi_dropdown = page.locator("#multi-select");
    const multi_dropdown = page.locator("//select[@name='States']");
    await multi_dropdown.selectOption(['California', 'Ohio', 'Texas','hi']);
    const selectedOptions = await multi_dropdown.evaluate((select) => {
        return Array.from(select.selectedOptions).map(option => option.text);
    });
    console.log("Selected options:", selectedOptions);
    const a = await text.evaluate((element) => {
        return element.textContent;  
      });
      
    console.log(a);
    
});
