module.exports = {
    testEnvironment: 'node', // Use 'jsdom' for browser-like environment
    coverageReporters: ['text', 'html'], // Generate text and HTML code coverage reports
    reporters: ['default', ['jest-junit', { outputDirectory: 'test-results/jest' }]],
    testResultsProcessor: 'jest-sonar-reporter', // Process results for SonarQube
  };