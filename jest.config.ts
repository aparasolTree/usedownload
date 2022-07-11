import type { Config } from '@jest/types';

const jestConfig: Config.InitialOptions = {
    preset: 'ts-jest',
    clearMocks: true,
    testMatch: ['<rootDir>/**/*.test.(ts|tsx)'],
    testEnvironment: 'jsdom',
    coverageDirectory: 'coverage',
    modulePathIgnorePatterns: ['<rootDir>/dist'],
    moduleNameMapper: {},
};

export default jestConfig;
