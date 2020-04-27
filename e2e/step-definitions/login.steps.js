const { defineFeature, loadFeature } = require("jest-cucumber");
const feature = loadFeature("./e2e/features/login.feature");
const puppeteer = require("puppeteer");

defineFeature(feature, (test) => {
  let user = "viadeen2bpod";
  let pass = "ASW1920en2b$";
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  beforeEach(async () => {
    await page.goto("http://localhost:3000");
  });

  test("The user wants to log into application", ({ given, when, then }) => {
    given("A user not logged in", async () => {
      await expect(page).toClick("button", { text: "LOG IN" });
    });

    when(
      "The user has reached the page to login and clicks the button to do so",
      async () => {
        await expect(page).toClick("button", { text: "Log In" });
        await expect(page).toClick("button", { text: "Solid Community" });
        await expect(page).toClick("button", { text: "Go" });
        await expect(page).toFillForm("form", {
          username: user,
          password: pass,
        });
        await expect(page).toClick("button", { text: "Log In" });
      }
    );

    then("The user is logged in", async () => {
      await expect(page).toMatchElement("alert", {
        text:
          "Logged in as https://viadeen2bpod.solid.community/profile/card#me",
      });
    });
  });
});
