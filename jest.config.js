module.exports = {
  moduleNameMapper: {
      '@app/(.*)': '<rootDir>/src/app/$1',
      '@env': '<rootDir>/src/environments/environment',
      '@commons-lib': '<rootDir>/projects/commons-lib/src/public-api.ts',
  },
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  collectCoverage: true
};