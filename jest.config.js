module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,ts}', '!**/__*__/**/*.*',],
  testPathIgnorePatterns: ['node_modules', 'tmp/', 'dist/', '.*\.perf\.ts'],
};
