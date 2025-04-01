module.exports = {
  launch: {
    dumpio: true,
    headless: true,
    args: ["--disable-gpu", "--disable-dev-shm-usage", "--no-sandbox"],
  },
  browserContext: "default",
};
