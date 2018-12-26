var express = require("express");
var webpack = require("webpack");
var webpackConfig = require("../webpack.config.js");
webpack(webpackConfig);
var app = express();
app.use(express.static(`${__dirname}/static`))

app.listen(9999, function () {
    console.log("Listening on port 9999!");
});