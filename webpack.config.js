const path = require('path')

module.exports = {
    // 单入口语法
    entry: './src/tree-shaking/a.js',

    // 对象语法
    /*
        常用场景：
                分离 应用程序(app) 和 第三方库(vendor) 入口(为了支持提供更佳 vendor 分离能力的 DllPlugin，考虑移除该场景)
    */
    // entry: {
    //     app: './src/tree-shaking/a.js',
    //     vendor: ['jquery',"vue", "vuex", "vue-router"] //不推荐 CommonsChunkPlugin会剥离出来公共的库
    // },

    // 多页面(与单页面的区别?)
    // entry: {
    //     pageOne: './src/pageOne/index.js',
    //     pageTwo: './src/pageTwo/index.js',
    //     pageThree: './src/pageThree/index.js'
    //   },

    // 出口: webpack 如何向硬盘写入编译文件(即使可以存在多个入口起点，但只指定一个输出配置)
    output: {
        filename: 'build.js', // 输出文件的文件名
        // filename: '[name].js', // 占位符确保文件是唯一的
        path: path.resolve(__dirname, 'dist'), //目标输出目录 path 的绝对路径
        // publicPath: '/', //(???)
    },

    // loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript(webpack只认识js文件)、css文件
        /*
            如sass-loader xxx.scss ===> xxx.css
        */
    module: {
        rules: [
            // 文件大小（单位 byte）低于指定的限制时，可以返回一个 base64
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            },
            // css-loader 解释(interpret) @import 和 url() ，会 import/require() 后再解析(resolve)它们。 url(/static/image.png) => require('/static/image.png')建议绝对路径
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ],
                options: {
                    url: true, // 启用/禁用 url() 处理
                    import: true, // 启用/禁用 @import 处理
                }
            },
        ]
    }
}