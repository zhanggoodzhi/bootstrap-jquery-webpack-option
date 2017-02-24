const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const AssetsPlugin = require('assets-webpack-plugin');
const entryPath = 'src/pages';
const outputPath = 'dist';
const files = glob.sync(path.join(entryPath, '**/index.ts'));

const entries = {};
for (let v of files) {
    let dir = path.dirname(v.replace(entryPath + '/', ''));
    entries[dir] = ['./src/global', './' + v];
}
module.exports = {
    context: path.join(__dirname),
    entry: entries,
    output: {
        path: path.resolve(__dirname,outputPath),
        // publicPath:'dist/',
        filename: '[name]/index.js'
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                use: ['ts-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: { // 这里的 limit=8192 表示用 base64 编码 <= ８K 的图像
                        limit: 8192
                    }
                }],
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
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