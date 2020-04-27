const _ = require('lodash');
const path = require('path');
const baseConfig = require('./webpack.config.base');

const developmentConfigurations = _.merge({}, baseConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        historyApiFallback: true,
        hot: true
    }
});

module.exports = developmentConfigurations;
