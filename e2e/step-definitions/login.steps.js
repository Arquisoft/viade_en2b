const expect = require("expect-puppeteer");
const { defineFeature, loadFeature } = require("jest-cucumber");
const feature = loadFeature("./e2e/features/login.feature");
const puppeteer = require("puppeteer");

defineFeature(feature, (test) => {
  let user = "viadeen2bpod";
  let pass = "ASW1920en2b$";

  beforeEach(async () => {
    await page.goto("http://localhost:3000", { waitUntil: "load", timeout: 0 });
  });

  test("The user wants to log into application", ({ given, when, then }) => {
    given("A user not logged in", async () => {
      await page.waitFor(12000);
      await expect(page).toClick("button", { text: "Open Menu" });
      await page.waitFor(1000);
      await expect(page).toClick("[href='#/routes']");
    });

    when(
      "The user has reached the page to login, clicks the button to do so and fills the data",
      async () => {
        await expect(page).toClick("button", { text: "Log In" });
        const newPagePromise = new Promise((x) =>
          browser.once("targetcreated", (target) => x(target.page()))
        );
        const popup = await newPagePromise;
        await popup.waitFor(2000);
        await expect(popup).toClick("button", { text: "Solid Community" });
        await expect(popup).toClick("button", { text: "Go" });
        await popup.waitFor(5000);
        await expect(popup).toFillForm("form", {
          username: user,
          password: pass,
        });
        await expect(popup).toClick("button", { text: "Log In" });
      }
    ); 

    then("The user is logged in", async () => {
      await page.waitFor(5000);
      await expect(page).toMatchElement("button", {
        text: "Log out",
      });
    });
  });
});
