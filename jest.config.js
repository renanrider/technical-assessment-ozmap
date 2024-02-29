module.exports = {
  roots: ['<rootDir>/src/tests'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/main/**'],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '<rootDir>/tests/(.*)': '<rootDir>/tests/$1',
    '<rootDir>/(.*)': '<rootDir>/src/$1',
  },
};
