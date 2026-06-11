import type { Config } from 'jest';

const config: Config = {
  projects: [
    '<rootDir>/apps/mobile/jest.config.ts',
    '<rootDir>/packages/shared',
    '<rootDir>/workers/content-api'
  ],
  collectCoverageFrom: [
    'apps/mobile/src/**/*.{ts,tsx}',
    'packages/shared/src/**/*.ts',
    'workers/content-api/src/**/*.ts'
  ]
};

export default config;
