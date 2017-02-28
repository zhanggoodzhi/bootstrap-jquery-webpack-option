const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const AssetsPlugin = require('assets-webpack-plugin');
const entryPath = 'src/pages';
const outputPath = 'public/dist';
const files = glob.sync(path.join(entryPath, '**/index.ts'));
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const entries = {};
for (let v of files) {
    let dir = path.dirname(v.replace(entryPath + '/', ''));
    entries[dir] = ['./src/global', './' + v];
}
module.exports = {
    context: path.join(__dirname),
    entry: entries,
    output: {
        path: path.resolve(__dirname, outputPath),
        publicPath: 'http://localhost:8080/public/dist/',
        filename: '[name]/index.js'
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'src/components'), path.resolve(__dirname, 'node_modules')
        ],
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                use: ['ts-loader']
            },
            {
                test: /\.(png|jpg|gif|woff2|eot|woff|ttf|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: { // 这里的 limit=8192 表示用 base64 编码 <= ８K 的图像
                        limit: 8192
                    }
                }],
            },
            {
                test: /\.css$/,
                use: ['style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: ['style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer, cssnano]
                        }
                    },
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common'
        }),
        new AssetsPlugin({
            filename: 'assets.json'
        })
    ],
    devtool: 'source-map'
};