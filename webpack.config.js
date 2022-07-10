const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin =
    require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: {
        app: path.resolve(__dirname, 'src/index.js'),
        another: path.resolve(__dirname, 'src/another-module.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].bundle.js',
        clean: true,
        assetModuleFilename: '[name][ext]',
    },
    optimization: {
        // minimize: true,
        // minimizer: [new TerserPlugin()],
        splitChunks: {
            // include all types of chunks
            chunks: 'all',
        },
    },
    // devtool: 'source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 3001,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true
    },
    module: {
        rules: [{
                test: /\.scss$/,
                // 'style-loader',
                use: [ 'css-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack App test',
            filename: 'index.html',
            template: 'src/template.html',
            pageTitle: 'Test Joke App'
        }),
        // new BundleAnalyzerPlugin()
    ]
}