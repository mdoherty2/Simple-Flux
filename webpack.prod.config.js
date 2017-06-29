const webpack = require('webpack');

module.exports = {
    entry: "./src/simpleFlux.js",
    output: {
        path: __dirname + "/dist/",
        libraryTarget: 'commonjs',
        library: 'simpleFlux',
        filename: "simpleFlux.js"
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
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
    devtool: "source-map",
    module: {
        rules: [
            {
                use: "babel-loader",
                test: /\.js$/
            }
        ]
    }
}
