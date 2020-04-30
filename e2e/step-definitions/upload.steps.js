const expect = require("expect-puppeteer");
const { defineFeature, loadFeature } = require("jest-cucumber");
const feature = loadFeature("./e2e/features/upload.feature");
const path = require("path");

defineFeature(feature, (test) => {
  let user = "viadeen2bpod";
  let pass = "ASW1920en2b$";

  beforeEach(async () => {
    await page.goto("http://localhost:3000", { waitUntil: "load", timeout: 0 });
  });

  afterEach(async () => {
    await page.goto("http://localhost:3000/viade_en2b/#", {
      waitUntil: "load",
      timeout: 0,
    });
  });

  test("Upload an image and link it to a route", ({ given, when, then }) => {
    given("A logged in user in the routes list page", async () => {
      // login sequence
      await page.waitFor(10000);
      await expect(page).toClick("button", { text: "Open Menu" });
      await page.waitFor(1000);
      await expect(page).toClick("[href='#/routes']");
      await page.waitFor(1000);
      await expect(page).toClick("button", { text: "Log In" });
      const newPagePromise = new Promise((x) =>
        browser.once("targetcreated", (target) => x(target.page()))
      );
      const popup = await newPagePromise;
      await popup.waitFor(5000);
      await expect(popup).toClick("button", { text: "Solid Community" });
      await expect(popup).toClick("button", { text: "Go" });
      await popup.waitFor(10000);
      await expect(popup).toFillForm("form", {
        username: user,
        password: pass,
      });
      await expect(popup).toClick("button", { text: "Log In" });
      await page.waitFor(10000);
      await expect(page).toMatchElement("button", {
        text: "Log out",
      });
      await page.waitFor(2000);
      await expect(page).toClick("button", { text: "Open Menu" });
      await page.waitFor(1000);
      await expect(page).toClick("[href='#/routes']");
      await page.waitFor("i[class='map icon']");
    });

    when("The user selects a route and uploads a file", async () => {
      await page.waitFor(2000);
      await jestPuppeteer.debug();
      await expect(page).toClick("[href='#/']");
      await page.waitFor(5000);
      await page.waitFor("button[class='rtf--mb']");
      await expect(page).toClick("button", { class: "rtf--mb" });
      await page.waitFor(1000);
      await expect(page).toClick("button", { text: "Take Photo" });
      await page.waitFor(1000);
      await expect(page).toUploadFile(
        "input[type='file']",
        path.join("../../public/images", "Viade.png")
      );
      await page.waitFor(2000);
    });

    then(
      "The user goes to the routes list page and finds the just-uploaded file attached to the route",
      async () => {
        await expect(page).toClick("button", { text: "Open Menu" });
        await page.waitFor(1000);
        await expect(page).toClick("[href='#/routes']");
        await page.waitFor("i[class='info icon']");
        await expect(page).toClick("[href='#/routes']");
        await page.waitFor(1000);
        await expect(page).toClick("a", { text: "Imagenes" });
        await page.waitFor(1000);
        await expect(page).toMatchElement("img", {
          src: "http://viadeen2bpod.solid.community/viade/resources/Viade.png",
        });
      }
    );
  });
});
