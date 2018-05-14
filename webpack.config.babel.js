import path from 'path';
import webpack from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

import nodeExternals from 'webpack-node-externals';

/**
 * Path / File
 */
const contextPath = path.resolve(__dirname, './');
const distPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');
const entryScriptsPath = path.resolve(srcPath, 'scripts/entry');
const outputFileName = 'bundle';

/**
 * Webpack Config
 */
const config = {
    target: 'node',
    mode: process.env.NODE_ENV,

    context: contextPath,
    entry: {
        main: path.resolve(srcPath, 'main.ts')
    },
    externals: [nodeExternals()],

    output: {
        path: distPath,
        filename: '[name].' + outputFileName + '.js',
        // mark /dist/ folder as a public path so index.html can reach it
        publicPath: './'
    },

    resolve: {
        extensions: ['.js', '.ts', '.json'],
        alias: {
            '@': path.resolve(srcPath)
        },
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                loader: 'ts-loader'
            }
        ]
    },

    devtool: (process.env.NODE_ENV == 'production')? false: '#source-map',

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: (process.env.NODE_ENV == 'production')? false: true,
                uglifyOptions: {
                    ecma: 8,
                    compress: {
                        warnings: false
                    }
                }
            })
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `"${process.env.NODE_ENV}"`
            }
        })
    ]
};

export default config;
