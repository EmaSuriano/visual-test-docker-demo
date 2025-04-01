// tests/setup.ts
import { configureToMatchImageSnapshot } from 'jest-image-snapshot';

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customDiffConfig: { threshold: 0.1 },
  failureThreshold: 0.01,
  failureThresholdType: 'percent',
  customSnapshotsDir: `${process.cwd()}/screenshots/baseline`,
  customDiffDir: `${process.cwd()}/screenshots/diff`,
  customReceivedDir: `${process.cwd()}/screenshots/current`,
});

expect.extend({ toMatchImageSnapshot });
