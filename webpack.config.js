const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const htmlWebpackPlugin  = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
function resolve (dir) {
    return path.join(__dirname, '..', dir)
  }
module.exports = {
    entry: {
        app: './src/main.js'
    },
    // 单入口语法
    // entry: './src/tree-shaking/a.js',

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
        filename: '[name].js', // 输出文件的文件名
        // filename: '[name].js', // 占位符确保文件是唯一的
        path: path.resolve(__dirname, 'dist'), //目标输出目录 path 的绝对路径
        publicPath: '/', //(???)
    },

    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          '@': resolve('src'),
          'vue$': 'vue/dist/vue.esm.js',
        }
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
                use: [
                    {
                      loader: 'url-loader',
                      options: {
                        limit: 8192
                      }
                    }
                ]
               
            },
            // css-loader 解析.css 解释(interpret) @import 和 url()
            // style-loader 将所有的计算后的样式以<style></style>加入页面中 二者组合在一起能够把样式表嵌入webpack打包后的js文件中。
            {
                test: /\.css$/,
                use: [
                        { loader: "style-loader" },
                        { loader: "css-loader" }, //webpack loader的执行顺序是从右到左
                        // options: {
                        //     url: true, // 启用/禁用 url() 处理
                        //     import: true, // 启用/禁用 @import 处理 
                        // }
                ]
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader'
                    }
                ]
            },
            {
                test: /\.jade$/,
                use: [
                    {
                        loader: 'jade'
                    }
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/ //忽略此文件夹，加快编译速度
                // include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
              },

        ]
    },

    devServer: {
        // historyApiFallback: { //404page
        //     rewrites: [
        //       { from: /.*/, to:  'index.html' },
        //     ],
        //   },
        port: 9999,
        // contentBase: "/asset",
        contentBase: false,
        compress: true, // 对所有的服务器资源采用gzip压缩
        hot: true,
        inline: true,
        host: 'localhost',
        // progress: true,
        open: true,
        overlay: true, // 编译出错的时候，在浏览器页面上显示错误
        // stats: "errors-only", // 只打印错误
        // quiet: true, // 类似stats
        // publicPath: '/',
        // watchOptions: {
        //     poll: true,
        //   }
    },

    plugins: [
         // 模板
        new htmlWebpackPlugin ({
            filename: 'index.html',
            template: './index.html',
            inject: true
        }),

         // copy custom static assets
        new CopyWebpackPlugin([
            {
            from: path.resolve(__dirname, './static'),
            to: 'static',
            ignore: ['.*']
            }
        ]),
     
        // make sure to include the plugin for the magic
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin("[name]-[chunkhash].css")
      ]
}