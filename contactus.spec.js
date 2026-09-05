const { test, expect } = require('@playwright/test');
// const { queryObjects } = require('v8');

test("contactus Page valid Test",async({page})=>{
    await page.goto("https://www.webdriveruniversity.com/Contact-Us/contactus.html");
    await page.getByPlaceholder("First Name").fill("Kavya");
    await page.getByPlaceholder("Last Name").fill("Tulasi");
    await page.getByPlaceholder("Email Address").fill("kavya23@gmail.com");
    await page.getByPlaceholder("Comments").fill("hello");
    await page.locator("//input[@value='SUBMIT']").click();
    const successmsg = await page.locator("//h1");
    console.log(await successmsg.textContent());
    
    // await expect(successmsg).toContainText("Thank You for your Message!");
    await expect(successmsg).toBeVisible("Thank You for your Message");
});

test("Invalid contactUs Test", async({page})=>{
    await page.goto("https://www.webdriveruniversity.com/Contact-Us/contactus.html");
    await page.getByPlaceholder("First Name").fill("Kavya");
    await page.getByPlaceholder("Last Name").fill("Tulasi");
    await page.locator("//input[@value='SUBMIT']").click();
    const errormsg = await page.getByText("fields are required");
    await expect(errormsg).toContainText("Error: all fields are required");

});
