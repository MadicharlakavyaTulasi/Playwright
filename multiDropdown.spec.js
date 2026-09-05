const { test, expect } = require('@playwright/test');
const xlsx = require('xlsx'); // Import the xlsx library
const { readExcelData_withoutheaders } = require('../Utils/excelUtils'); // Import Excel utility functions


test("multi dropdown with Excel values", async ({ page }) => {
    // Go to the webpage
    await page.goto("https://www.lambdatest.com/selenium-playground/select-dropdown-demo");

    // Read data from the Excel file
    //allstates.xlsx
    const excelFilePath = 'tests/statesinonecell.xlsx'; 
    const sheetName = 'Sheet1'; 
    const excelData = readExcelData_withoutheaders(excelFilePath, sheetName);
    
    // Let's assume the states are in the first column of the sheet (Index 0)
    // const statesToSelect = excelData.map(row => row[0]); 

    /*
    const statesToSelect = [];
    for (let i = 0; i < excelData.length; i++) {
        statesToSelect.push(excelData[i][0]);  
    }
    console.log(statesToSelect);

    */
    console.log("data in excel:"+excelData);
    console.log("type of data "+typeof(excelData));
    
    const dataarrayfromexcel = [];
    const excelString = excelData[0][0]; // Get the comma-separated string from first cell
    const splitData = excelString.split(',').map(item => item.trim()); // Split by comma and trim whitespace
    console.log("splitdata:"+splitData);
    for (let i = 0; i < splitData.length; i++) 
    {
        dataarrayfromexcel.push(splitData[i]);

    
    }
    console.log("available options in excel:" + dataarrayfromexcel);




    /*
    const datainexcel = [];
    for (let i = 0; i < excelData.length; i++) {
        datainexcel.push(excelData[i][0]);  
    }
    console.log("available options in excel:"+datainexcel);
    */
    /*
    for (let i = 0; i < excelData[0].length; i++) {
        statesToSelect1.push(excelData[0][i]);  
    }
    */
    // console.log(statesToSelect1);


    const randomdata = [];
    const n = Math.floor(Math.random() * (dataarrayfromexcel.length + 1))
    console.log('n value:'+n);
    for (let i = 0; i < n; i++) {
        const randomIndex = Math.floor(Math.random() * dataarrayfromexcel.length);
        randomdata.push(dataarrayfromexcel[randomIndex]);
    }
    console.log("randomly selected data from array collected data from excel:"+randomdata);

    const multi_dropdown = page.locator("//select[@name='States']");

    const allOptions = await multi_dropdown.evaluate((select) => {
        return Array.from(select.options).map(option => option.text);
    });
    console.log("All available options in dropdown:", allOptions);

    const availableOptions = allOptions.filter(option => randomdata.includes(option));
    console.log("options need to select from dropdown:", availableOptions);


    // const statesToSelect = excelData[0]; 

    // console.log("States from Excel: ", statesToSelect);
    console.log("random data ", randomdata);

    const day_dropdown = page.locator("#select-demo");
    await day_dropdown.selectOption('Wednesday');
    const text = page.locator(".selected-value");
    await expect(text).toContainText("Day selected");

    if (randomdata.every(item => availableOptions.includes(item)))
    {
        await multi_dropdown.selectOption(randomdata);
        const selectedOptions = await multi_dropdown.evaluate((select) => {
            return Array.from(select.selectedOptions).map(option => option.text);
        });
    }
    else
    {
        console.log("random data not available in dropdown");
        try {
            await test.soft(async () => {
            await multi_dropdown.selectOption(randomdata);
            const selectedOptions = await multi_dropdown.evaluate((select) => {
                return Array.from(select.selectedOptions).map(option => option.text);
            });
            console.log("Selected options from dropdown:", selectedOptions);
            });
        } catch (error) {
            console.error("----------------------Error-----------------");
        }    

    }


    
    
    // Checking evaluate function
    const a = await text.evaluate((element) => {
        return element.textContent;
    });
    console.log(a);

    
});


