const { test, expect } = require('@playwright/test');
const path = require('path');
 
test("Uploading file",async ({page})=>{
    await page.goto("https://www.webdriveruniversity.com/File-Upload/index.html");
    const file_upload =  page.locator("xpath=//input[@id='myFile']");
    await file_upload.click();
    //file upload
    await file_upload.setInputFiles(path.join(__dirname,'sample.txt'));//tests folder in the playwright project
    //capture screenshot
    await page.screenshot({path:'fileupload_ss.png'});
    await file_upload.screenshot({path:'elementscreenshot.png'});
    //pop-up
    page.once('dialog',async dialog =>{
        console.log(dialog.message());
        await dialog.accept();

    });
    //submit
    await page.locator("xpath=//input[@id='submit-button']").click();
    //full screen shot
    await page.screenshot({path:'fullscreenshot.png',fullPage:true});

 });
