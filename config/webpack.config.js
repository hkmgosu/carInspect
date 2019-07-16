var path = require('path');
var defaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

var env = process.env.APP_ENV ? process.env.APP_ENV : 'dev';

var devWebPackConfig = defaultConfig.dev;
devWebPackConfig.resolve.alias = {
  "@app/env": path.resolve('./src/env/env.' + env + '.ts')
};

var prodWebPackConfig = defaultConfig.prod;
prodWebPackConfig.resolve.alias = {
  "@app/env": path.resolve('./src/env/env.' + env + '.ts')
};

module.exports = {
  dev: devWebPackConfig,
  prod: prodWebPackConfig
};
