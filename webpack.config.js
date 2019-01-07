const dotenv = require('dotenv');
const env = Object.assign({},
    dotenv.config({ path: '.env' }).parsed || {},
    dotenv.config({ path: '.env.local' }).parsed || {});

const path = require('path');
const webpack = require('webpack');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

/**
 * Path / File
 */
const contextPath = path.resolve(__dirname, './');
const distPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');

const isProduct = env.NODE_ENV == 'production';

/**
 * Webpack Config
 */
module.exports = {
    target: 'node',
    mode: env.NODE_ENV,

    context: contextPath,
    entry: {
        main: path.resolve(srcPath, 'main.ts'),
    },
    externals: [ nodeExternals() ],

    output: {
        path: distPath,
        filename: '[name].bundle.js',
        // mark /dist/ folder as a public path so index.html can reach it
        publicPath: './',
    },

    resolve: {
        extensions: [ '.js', '.ts', '.json' ],
        alias: {
            '@': path.resolve(srcPath),
        },
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [ 'ts-loader', 'tslint-loader' ],
            },
        ],
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `"${env.NODE_ENV}"`,
            },
        }),
    ],

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: !isProduct,
                uglifyOptions: {
                    ecma: 8,
                    compress: {
                        warnings: false,
                    },
                },
            }),
        ],
    },

    devtool: isProduct? false: '#source-map',
};
