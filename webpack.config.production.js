const _ = require('lodash');
const baseConfig = require('./webpack.config.base');

const productionConfigurations = _.merge({}, baseConfig, {
    mode: 'production'
});

module.exports = productionConfigurations;
