// jest.config.ts
export default {
  preset: "jest-puppeteer",
  testMatch: ["**/__tests__/**/*.test.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/__tests__/setup.ts"],
  testTimeout: 30000, // Increase timeout to 30 seconds for visual tests
};
