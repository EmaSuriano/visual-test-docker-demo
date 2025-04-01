const { configureToMatchImageSnapshot } = require("jest-image-snapshot");

const customConfig = {
  customDiffConfig: {
    threshold: 0.1, // Threshold for the comparison
  },
  failureThreshold: 0.01,
  failureThresholdType: "percent",
};

expect.extend({
  toMatchImageSnapshot: configureToMatchImageSnapshot(customConfig),
});
