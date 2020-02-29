const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {HotModuleReplacementPlugin} = require('webpack');

const OUTPUT_DIRECTORY = 'dist';

module.exports = {
    mode: 'development',
    entry: {
        main: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/main.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, OUTPUT_DIRECTORY),
        publicPath: '/',
        globalObject: `(typeof self !== 'undefined' ? self : this)`,
        hotUpdateChunkFilename: '.hot/[id].[hash].hot-update.js',
        hotUpdateMainFilename: '.hot/[hash].hot-update.json'
    },
    resolve: {
        extensions: ['.js', '.vue'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                        ],
                    },
                },
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        },
                    },
                ],
            },
            {
                test: /\.(jpe?g|gif|png|svg|woff|ttf|eot|wav|mp3)$/,
                loader: 'file-loader'
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([
            {
                from: 'stubs/index.html'
            },
            {
                from: 'node_modules/vue/dist/vue.min.js',
                to: 'extLib/vue.min.js'
            },
            {
                from: 'node_modules/@babel/polyfill/dist/polyfill.min.js',
                to: 'extLib/polyfill.min.js'
            },
        ])
    ],
    externals: {
        vue: 'Vue',
    }
};
