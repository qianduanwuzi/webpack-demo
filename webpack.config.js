const path = require('path')

module.exports = {
    entry: './src/tree-shaking/a.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'dist')
    }
}