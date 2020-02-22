const _ = require('lodash');
const baseConfig = require('./webpack.config.base');

const developmentConfigurations = _.merge({}, baseConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './public',
        historyApiFallback: true,
        hot: true
    }
});

module.exports = developmentConfigurations;
