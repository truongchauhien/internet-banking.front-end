module.exports = {
    mode: 'development', // development' | 'production' | 'None',
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
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            }
        ]
    },
    output: {
        path: __dirname + '/public',
        publicPath: '/assets/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './public',
        hot: true
    }
};
