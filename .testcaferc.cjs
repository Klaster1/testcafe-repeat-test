/** @type {TestCafeConfigurationOptions} */
module.exports = {
  browsers: ['chrome:headless'],
  reporter: {
    name: 'json',
    output: './tests/report.json',
  },
};
