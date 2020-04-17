const { defineFeature, loadFeature } = require("jest-cucumber");
const feature = loadFeature("e2e/features/login.feature");

const auth = require("solid-auth-client");

const mockAuth = jest.spyOn(auth, "currentSession");
mockAuth.mockImplementation(async () => {
  return { webId: "https://example.org/profile/card#me" };
});

defineFeature(feature, (test) => {
  beforeEach(async () => {
    await page.goto("https://arquisoft.github.io/viade_en2b/#/");
  });

  test("The user wants to log into application", ({ given, when, then }) => {
    given("A user not logged in", () => {
      page.goto("https://arquisoft.github.io/viade_en2b/#/login");
    });

    when("The user has reached the page", async () => {
      const button = page.find("#loginBtn");
      await button.simulate("click");
    });

    then("The user is logged in", () => {
      expect(page).toContain("button", { text: "Log out" });
    });
  });
});
