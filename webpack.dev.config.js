module.exports = {
    entry: "./src/main.js",
    output: {
        path: __dirname + "/.build/",
        filename: "bundle.js"
    },
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
