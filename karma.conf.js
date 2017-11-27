module.exports = function(config) {
  const configuration = {
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    preprocessors: {
    },
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('@angular/cli/plugins/karma')
    ],
    customLaunchers: {
      Chrome_travis_ci: {
          base: 'Chrome',
          flags: [
            '--no-sandbox',
            '--headless',
            '--disable-gpu',
            '--remote-debugging-port=9222'
          ]
      }
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: Boolean(process.env.WATCH_MODE),
    browsers: ['Chrome'],
    singleRun: !Boolean(process.env.WATCH_MODE),
    concurrency: Infinity
  }

  if (process.env.TRAVIS) {
    configuration.browsers = ['Chrome_travis_ci'];
  }
 
  config.set(configuration);
}
