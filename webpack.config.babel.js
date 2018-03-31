import path from 'path';
import webpack from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

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
    output: {
        path: distPath,
        filename: '[name].' + outputFileName + '.js',
        // mark /dist/ folder as a public path so index.html can reach it
        publicPath: '/'
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
                loader: 'ts-loader',
                options: { appendTsSuffixTo: [ /\.vue$/ ] }
            }
        ]
    },

    plugins: []
};

/**
 * add pages
 */
addpage(config, 'index', '/', './static/favicon.ico');

/**
 * When use in production (npm run build)
 */
if (process.env.NODE_ENV === 'production') {
    /**
     * https://vuejs.org/guide/deployment.html
     */
    config.plugins = (config.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new UglifyJsPlugin({
            sourceMap: false,
            uglifyOptions: {
                mangle: {
                    // Vue Componentが動かなくなる対策
                    keep_fnames: true
                },
                ecma: 8,
                compress: {
                    warnings: false
                }
            }
        })
    ]);
} else {
    config.devtool = '#eval-source-map';
    config.plugins = (config.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
    ]);
};

module.exports = config;
