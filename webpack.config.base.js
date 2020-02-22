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
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
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
        path: __dirname + '/public',
        publicPath: '/assets/',
        filename: 'bundle.js'
    }
};
