const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const entryPath = 'src/pages';
const outputPath = 'dist';

const files = glob.sync(path.join(entryPath, '**/index.ts'));
const entries = {};
for (let v of files) {
    let dir = path.dirname(v.replace(entryPath + '/', ''));
    entries[dir] = ['./src/global', './' + v];
}
console.log(entries);
module.exports = {
    entry: entries,
    output: {
        path: outputPath,
        filename: '[name]/index.js'
    },
    resolve: {
        extensions: ["", ".js", ".ts", ".tsx"]
    },
    module: {
        loaders: [{
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192' // 这里的 limit=8192 表示用 base64 编码 <= ８K 的图像
            }, {
                test: /\.css$/,
                loader: 'style!css'
            }, {
                test: /\.less$/,
                loader: 'style!css!less'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true
        })
    ],
    devtool: 'source-map'
};