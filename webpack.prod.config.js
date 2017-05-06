const webpack = require('webpack');

module.exports = {
    entry: "./src/simpleFlux.js",
    output: {
        path: __dirname + "/dist/",
        filename: "simpleFlux.js"
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        })
    ],
    devtool: "eval",
    module: {
        rules: [
            {
                use: "babel-loader",
                test: /\.js$/
            }
        ]
    }
}
