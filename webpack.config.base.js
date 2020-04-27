const path = require('path');
const envConfigPlugin = require('./webpack.plugin.env-config');

module.exports = {
    entry: {
        app: './src/index.jsx'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.scss$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName: '[path]__[name]__[local]'
                            },
                            localsConvention: 'camelCase'
                        }
                    },
                    'sass-loader'
                ],
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        envConfigPlugin
    ],
    output: {
        path: path.resolve(__dirname, 'public/assets/scripts'),
        publicPath: '/assets/scripts',
        filename: 'bundle.js'
    }
};
