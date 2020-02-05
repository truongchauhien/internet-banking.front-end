module.exports = {
    mode: 'production', // development' | 'production' | 'None',
    entry: {
        app: './src/index.js'
    },
    output: {
        path: __dirname + '/public',
        publicPath: '/assets/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './public'
    }
}