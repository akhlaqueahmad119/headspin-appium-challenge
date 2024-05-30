// const wdio = require("webdriverio");
const { saveData, loadData } = require("../utils/utils");

describe("Amazon vs Flipkart Price and Delivery Comparison", () => {
  let amazonPrice, amazonDeliveryDate;
  let flipkartPrice, flipkartDeliveryDate;
  const pincode = "110008"; // Consistent pincode used for both tests

  before(() => {
    const data = loadData();
    amazonPrice = data.amazonPrice || null;
    amazonDeliveryDate = data.amazonDeliveryDate || null;
    flipkartPrice = data.flipkartPrice || null;
    flipkartDeliveryDate = data.flipkartDeliveryDate || null;
  });

  function parsePrice(priceString) {
    return parseFloat(priceString.replace(/[^0-9.-]+/g, ""));
  }

  function getDeliveryDays(deliveryDate) {
    const today = new Date();
    if (deliveryDate.includes("Today")) return 0;
    if (deliveryDate.includes("Tomorrow")) return 1;

    const deliveryDateMatch = deliveryDate.match(/(\w+)\s(\d+)/);
    if (deliveryDateMatch) {
      const day = deliveryDateMatch[2];
      const month = new Date()
        .toLocaleString("default", { month: "long" })
        .indexOf(deliveryDateMatch[1]);
      const year = today.getFullYear();
      const delivery = new Date(year, month, day);
      const diffTime = Math.abs(delivery - today);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return null;
  }

  it("fetch iPhone 15 details from Amazon", async () => {
    await driver.pause(2000);
    const currentPackage = await driver.getCurrentPackage();
    await driver.pause(1000);
    if (currentPackage === "in.amazon.mShop.android.shopping") {
      try {
        // driver.startActivity("in.amazon.mShop.android.shopping", "com.amazon.mShop.home.HomeActivity");
        try {
          await $('//*[@content-desc="Select English"]').click();
          await $('//*[@text="Continue in English"]').click();
        } catch (error) {
          console.log("Language selection didn't appeared");
        }
        try {
          await $('//*[@text="Skip sign in"]').click();
        } catch (error) {
          console.log("Skip Button is not available");
        }

        await driver.pause(4000);

        await $('//*[@text="Search Amazon.in"]').click();
        await driver.pause(2000);
        await $('//*[@text="Search Amazon.in"]').addValue(
          "iPhone 15 Black 128 GB"
        );
        await driver.pause(2000);
        await driver.pressKeyCode(66);
        await driver.pause(4000);

        const item = await $(
          '//android.widget.TextView[@text="Apple iPhone 15 (128 GB) - Black"]'
        ).click();
        await driver.pause(6000);

        try {
          await $(
            'android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().textContains("Total"))'
          );
          await driver.pause(1000);
          await $(
            'android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().textContains("Total"))'
          );
          await driver.pause(2000);
          const priceElement = await $("//*[contains(@text, 'Total: ₹')]");
          await driver.pause(1000);
          amazonPrice = await priceElement.getText();
        } catch (error) {
          console.log("Price element not found", error);
          amazonPrice = null;
        }
        await driver.pause(2000);
        try {
          const deliveryElement = await $(
            `//*[contains(@text, 'Today') or contains(@text, 'Tomorrow') or contains(@text, 'Monday') or contains(@text, 'Tuesday') or contains(@text, 'Wednesday') or contains(@text, 'Thursday') or contains(@text, 'Friday') or contains(@text, 'Saturday') or contains(@text, 'Sunday') or contains(@text, 'day') or contains(@text, 'Days')]`
          );
          await driver.pause(1000);
          amazonDeliveryDate = await deliveryElement.getText();
        } catch (error) {
          console.log("Delivery date element not found", error);
          amazonDeliveryDate = null;
        }
        saveData({
          amazonPrice,
          amazonDeliveryDate,
          flipkartPrice,
          flipkartDeliveryDate,
        });
        console.log("Amazon Price", amazonPrice);
        console.log("Amazon Delivery Date", amazonDeliveryDate);

        await driver.pause(2000);

        await driver.back();
        await driver.back();

        await driver.pause(2000);
      } catch (error) {
        console.log("error :", error);
      }
    } else {
      console.log("Skip the code as its not running app");
    }
  });

  it("fetch iPhone 15 details from Flipkart", async () => {
    await driver.pause(2000);
    const currentPackage = await driver.getCurrentPackage();
    await driver.pause(1000);
    if (currentPackage === "com.flipkart.android") {
      try {
        await driver.pause(2000);
        try {
          await $("//*[@text='English']").click();
          await $("//*[@text='CONTINUE']").click();
          await $(
            "//*[@resource-id='com.flipkart.android:id/custom_back_icon']"
          ).click();
          await driver.pause(2000);
        } catch (error) {
          console.log("HomePage opened with language selection");
        }
        await driver.pause(2000);
        await $("//*[@text='Search for Products, Brands and More']").click();
        const textfield = await $("~Search grocery products");
        await driver.pause(1000);
        await textfield.addValue("iPhone 15 Black 128 GB");
        await driver.pause(2000);
        await $(
          "//*[@resource-id='com.flipkart.android:id/txt_title']"
        ).click();

        await driver.pause(1000);
        await $("//*[@text='CONTINUE']").click();
        await driver.pause(2000);
        await $("//*[@text='Deny']").click();
        // await $("android.view.ViewGroup").click();
        await $(
          'android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().textContains("Apple iPhone 15"))'
        ).click();
        await driver.pause(4000);
        await $(
          'android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().textContains("Enter pincode"))'
        );
        await driver.pause(4000);
        await $("//*[@text='Enter pincode ']").click();
        await driver.pause(3000);
        const pincodeField = await $("//*[@text='Enter pincode']");
        await pincodeField.addValue(pincode);
        await driver.pause(2000);
        await $("//*[@text='Submit ']").click();
        await driver.pause(4000);

        try {
          const priceElement = await $("//*[contains(@text, '₹')]");
          await driver.pause(1000);
          flipkartPrice = await priceElement.getText();
        } catch (error) {
          console.log("Price element not found", error);
          flipkartPrice = null;
        }

        try {
          const deliveryElement = await $(
            `//*[contains(@text, 'Today') or contains(@text, 'Tomorrow') or contains(@text, 'Monday') or contains(@text, 'Tuesday') or contains(@text, 'Wednesday') or contains(@text, 'Thursday') or contains(@text, 'Friday') or contains(@text, 'Saturday') or contains(@text, 'Sunday') or contains(@text, 'day') or contains(@text, 'Days')]`
          );
          await driver.pause(1000);
          flipkartDeliveryDate = await deliveryElement.getText();
        } catch (error) {
          console.log("Delivery date element not found", error);
          flipkartDeliveryDate = null;
        }
        saveData({
          amazonPrice,
          amazonDeliveryDate,
          flipkartPrice,
          flipkartDeliveryDate,
        });
      } catch (error) {
        console.error("An error occurred during the test execution:", error);
      }

      console.log("Amazon Price", amazonPrice);
      console.log("Amazon Delivery Date", amazonDeliveryDate);
      console.log(`Flipkart Price: ${flipkartPrice}`);
      console.log(`Flipkart Delivery Date: ${flipkartDeliveryDate}`);
      await driver.pause(2000);

      await driver.terminateApp("com.flipkart.android");

      await driver.pause(5000);
    } else {
      console.log("Skip the code as its not running app");
    }
  });

  it("compare prices and delivery times", () => {
    if (!amazonPrice || !flipkartPrice) {
      if (!amazonPrice) {
        console.log("It's unavailable in Amazon app, go for the Flipkart app");
      } else {
        console.log("It's unavailable in Flipkart app, go for the Amazon app");
      }
    } else {
      console.log("Amazon Price :-", amazonPrice);
      console.log("Amazon Delivery Date :-", amazonDeliveryDate);
      console.log(`Flipkart Price : ${flipkartPrice}`);
      console.log(`Flipkart Delivery Date : ${flipkartDeliveryDate}`);

      const amazonPriceValue = parsePrice(amazonPrice);
      const flipkartPriceValue = parsePrice(flipkartPrice);

      const amazonDeliveryDays = getDeliveryDays(amazonDeliveryDate);
      const flipkartDeliveryDays = getDeliveryDays(flipkartDeliveryDate);

      if (
        flipkartPriceValue > amazonPriceValue &&
        flipkartDeliveryDays > amazonDeliveryDays
      ) {
        console.log("Amazon price is lower and can deliver earlier");
      } else if (
        amazonPriceValue > flipkartPriceValue &&
        amazonDeliveryDays > flipkartDeliveryDays
      ) {
        console.log("Flipkart price is lower and can deliver earlier");
      } else if (
        amazonPriceValue === flipkartPriceValue &&
        amazonDeliveryDays === flipkartDeliveryDays
      ) {
        console.log("Go for any app of your choice");
      } else if (
        flipkartPriceValue > amazonPriceValue &&
        amazonDeliveryDays > flipkartDeliveryDays
      ) {
        console.log("Amazon will deliver faster");
      } else if (
        amazonPriceValue > flipkartPriceValue &&
        flipkartDeliveryDays > amazonDeliveryDays
      ) {
        console.log("Flipkart will deliver faster");
      }
    }
  });
});
