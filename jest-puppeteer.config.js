module.exports = {
  server: {
    command: "npm start",
    port: 3000,
    launchTimeout: 1000000,
    debug: true,
  },
  launch: {
    headless: false,
    devtools: true,
  },
  browser: "chromium",
};
