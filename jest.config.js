module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,ts}', '!**/__tests__/**/*.*', '!**/__mocks__/**/*.*'],
  testPathIgnorePatterns: ['node_modules', 'tmp/', 'dist/', '.*\.perf\.ts'],
};
