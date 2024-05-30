
describe('Amazon vs Flipkart Price and Delivery Comparison', () => {
    it('fetch iPhone 15 details from Amazon', async () => {
        await $('//*[@content-desc="Select English"]').click();
        await $('//*[@text="Continue in English"]').click();
        try {
            await $('//*[@text="Skip sign in"]').click();
        } catch (error) {
            console.log("skip Button is not Available")
        }

        // await driver.pause(10000);

        //Verify and click "Update location"
       // --------  
       await driver.pause(5000);

           await $("//*[contains(@resource-id, 'in.amazon.mShop.android.shopping:id/glow_subnav_label')]").click();
            await driver.pause(5000);
            try {
            const updateLocationButton =  await $("//*[contains(@text, 'Enter an Indian pincode')]");
            await updateLocationButton.waitForDisplayed({ timeout: 20000});
            console.log("Update location button is displayed");

            await updateLocationButton.click();
            console.log("Clicked on Update location button");

            // Additional pause to allow dialog to open
            await driver.pause(5000);


        } catch (error) {
            console.log("Update location button is not found or clickable:", error);
        }
        //----
        console.log("tried and out now")
        await driver.pause(2000);

        await $('//*[@text="Search Amazon.in"]').click();

        await driver.pause(2000);
        await $('//*[@text="Search Amazon.in"]').addValue("iPhone 15 Black 128 GB");
        await driver.pause(2000);
        await driver.pressKeyCode(66)
        await driver.pause(2000);

        const item = await $('//android.widget.TextView[@text="Apple iPhone 15 (128 GB) - Black"]').click();
        await driver.pause(5000);
        await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().textContains("Total: ₹"))');
        await driver.pause(2000);



        let amazonPrice;
        let amazonDeliveryDate;
        try {
            const priceElement = await $("//*[contains(@text, 'Total: ₹')]");
            await driver.pause(1000);
            amazonPrice = await priceElement.getText();
            console.log(amazonPrice, "akhlaque")
        } catch (error) {
            console.log('Price element not found');
            amazonPrice = null;
        }
        await driver.pause(2000);
        try {
            const deliveryElement = await $(`//*[contains(@text, 'Today') or contains(@text, 'Tomorrow') or contains(@text, 'Monday') or contains(@text, 'Tuesday') or contains(@text, 'Wednesday') or contains(@text, 'Thursday') or contains(@text, 'Friday') or contains(@text, 'Saturday') or contains(@text, 'Sunday') or contains(@text, 'day') or contains(@text, 'Days')]`);
            await driver.pause(1000);
            amazonDeliveryDate = await deliveryElement.getText();
        } catch (error) {
            console.log('Delivery date element not found');
            amazonDeliveryDate = null;
        }
        console.log("Amazon Price", amazonPrice)
        console.log("Amazon Dilivery Date", amazonDeliveryDate)

        await driver.pause(5000);

    })
    // it('iPhone 15 details from Flipkart', async () => {

    //     await driver.pause(5000);

    //     try {
    //         await driver.pause(2000);
    //         await $("//*[@text='English']").click();
    //         await $("//*[@text='CONTINUE']").click();
    //         await $("//*[@resource-id='com.flipkart.android:id/custom_back_icon']").click();
    //         await driver.pause(2000);
    //         await $("//*[@text='Search for Products, Brands and More']").click();
    //         const textfield = await $("~Search grocery products");
    //         await textfield.addValue("iPhone 15 Black 128 GB");
    //         await driver.pause(1000);
    //         await $("//*[@resource-id='com.flipkart.android:id/txt_title']").click();
    //         await $("//*[@text='CONTINUE']").click();
    //         await driver.pause(2000);
    //         await $("//*[@text='Deny']").click();
    //         await $("android.view.ViewGroup").click();
    //         await driver.pause(2000);
    //         await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().textContains("Enter pincode"))');
    //         await driver.pause(1000);
    //         await $("//*[@text='Enter pincode ']").click();
    //         await driver.pause(1000);
    //         const pincodeField = await $("//*[@text='Enter pincode']");
    //         await pincodeField.addValue("831003");
    //         await driver.pause(1000);
    //         await $("//*[@text='Submit ']").click();
    //         await driver.pause(5000);

    //         let price;
    //         let deliveryDate;
    //         try {
    //             const priceElement = await $("//*[contains(@text, '₹')]");
    //             await driver.pause(1000);
    //             price = await priceElement.getText();
    //         } catch (error) {
    //             console.log('Price element not found');
    //             price = null;
    //         }

    //         try {
    //             const deliveryElement = await $(`//*[contains(@text, 'Today') or contains(@text, 'Tomorrow') or contains(@text, 'Monday') or contains(@text, 'Tuesday') or contains(@text, 'Wednesday') or contains(@text, 'Thursday') or contains(@text, 'Friday') or contains(@text, 'Saturday') or contains(@text, 'Sunday') or contains(@text, 'day') or contains(@text, 'Days')]`);
    //             await driver.pause(1000);
    //             deliveryDate = await deliveryElement.getText();
    //         } catch (error) {
    //             console.log('Delivery date element not found');
    //             deliveryDate = null;
    //         }

    //         console.log(`Price: ${price}`);
    //         console.log(`Delivery Date: ${deliveryDate}`);
    //     } catch (error) {
    //         console.error('An error occurred during the test execution:', error);
    //     }
    // });
});



//-------------------------------------------------------------------------------------------

// describe('Sample', () => {
//     it('fetch iPhone 15 details from Amazon', async () => {
//         await $('//*[@content-desc="Select English"]').click();
//         await $('//*[@text="Continue in English"]').click();
//         try {
//             await $('//*[@text="Skip sign in"]').click();
//         } catch (error) {
//             console.log("skip Button is not Available")
//         }

//         // await driver.pause(10000);

//         // Verify and click "Update location"
//         //--------  
//         //    await $("//*[contains(@resource-id, 'in.amazon.mShop.android.shopping:id/glow_subnav_label')]").click();
//         //     await driver.pause(5000);
//         //     try {
//         //     const updateLocationButton =  await $("//*[contains(@text, 'Enter an Indian pincode')]");
//         //     await updateLocationButton.waitForDisplayed({ timeout: 20000});
//         //     console.log("Update location button is displayed");

//         //     await updateLocationButton.click();
//         //     console.log("Clicked on Update location button");

//         //     // Additional pause to allow dialog to open
//         //     await driver.pause(5000);


//         // } catch (error) {
//         //     console.log("Update location button is not found or clickable:", error);
//         // }
//         //----
//         console.log("tried and out now")
//         await driver.pause(2000);

//         await $('//*[@text="Search Amazon.in"]').click();

//         await driver.pause(2000);
//         await $('//*[@text="Search Amazon.in"]').addValue("iPhone 15 Black 128 GB");
//         await driver.pause(2000);
//         await driver.pressKeyCode(66)
//         await driver.pause(2000);

//         const item = await $('//android.widget.TextView[@text="Apple iPhone 15 (128 GB) - Black"]').click();
//         await driver.pause(5000);
//         await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().textContains("Total: ₹"))');
//         await driver.pause(2000);



//         let amazonPrice;
//         let amazonDeliveryDate;
//         try {
//             const priceElement = await $("//*[contains(@text, 'Total: ₹')]");
//             await driver.pause(1000);
//             amazonPrice = await priceElement.getText();
//             console.log(amazonPrice, "akhlaque")
//         } catch (error) {
//             console.log('Price element not found');
//             amazonPrice = null;
//         }

//         try {
//             const deliveryElement = await $(`//*[contains(@text, 'Today') or contains(@text, 'Tomorrow') or contains(@text, 'Monday') or contains(@text, 'Tuesday') or contains(@text, 'Wednesday') or contains(@text, 'Thursday') or contains(@text, 'Friday') or contains(@text, 'Saturday') or contains(@text, 'Sunday') or contains(@text, 'day') or contains(@text, 'Days')]`);
//             await driver.pause(1000);
//             amazonDeliveryDate = await deliveryElement.getText();
//         } catch (error) {
//             console.log('Delivery date element not found');
//             amazonDeliveryDate = null;
//         }
//         console.log("Amazon Price", amazonPrice)
//         console.log("Amazon Dilivery Date", amazonDeliveryDate)

//         await driver.pause(5000);

//     })
// })
