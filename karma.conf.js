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
          flags: ['--no-sandbox']
      }
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  }

  if (process.env.TRAVIS) {
    configuration.browsers = ['Chrome_travis_ci'];
  }
 
  config.set(configuration);
}
