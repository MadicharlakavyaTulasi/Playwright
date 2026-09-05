const { test, expect } = require('@playwright/test');

test('Built-in Locators' ,async ({page})=>{
    //alert
    await page.goto("https://www.webdriveruniversity.com/Popup-Alerts/index.html");
    page.once('dialog',async dialog =>{
        console.log(dialog.message());
        await dialog.accept();

    });
    await page.locator("xpath=//*[@id='button1']").click();
    //confirm
    page.once('dialog',async dialog =>{
        console.log(dialog.message());
        await dialog.dismiss();

    });
    await page.locator("xpath=//*[@id='button4']").click();
    const msg = await page.locator("//p[@id='confirm-alert-text']");
    console.log(await msg.textContent());

     // Model Pop-Up
     await page.locator("xpath=//*[@id='button2']").click();
     const modal_title = await page.getByRole('heading', { name: 'It’s that Easy!! Well I think' }).innerText();
     console.log(modal_title);
  
  
     const modal_content = await page.getByText('We can inject and use').textContent();
     console.log(modal_content);
  
     await page.getByRole('button', { name: 'Close' }).click();


});
