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
    resolve: {
        extensions: ['.js', '.jsx']
    },
    output: {
        path: __dirname + '/public',
        publicPath: '/assets/',
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './public',
        historyApiFallback: true,
        hot: true
    }
};
