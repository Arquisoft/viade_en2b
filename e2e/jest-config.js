module.exports = {
  verbose: true,
  preset: "jest-puppeteer",
  testRegex: "./*\\.steps\\.js$",
  setupFilesAfterEnv: ["./jest.setup.js"],
};
