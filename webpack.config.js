const path = require('path');
const {DefinePlugin} = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = function(env, argv) {
    const plugins = [
        new DefinePlugin({
            BASE_INSIGHTS_URL: JSON.stringify(
                process.env.BASE_INSIGHTS_URL || 'https://moneypenny.agxmeister.services'
            )
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: './public/manifest.json',
                to: './manifest.json'
            }, {
                from: './public/icons',
                to: './icons'
            }]
        }),
    ];
    if (argv.mode === 'production') {
        plugins.push(
            new WorkboxPlugin.GenerateSW({
                clientsClaim: true,
                skipWaiting: true,
            })
        );
    }

    return {
        entry: './src/index.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                }, {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                }, {
                    test: /\.sass$/i,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    exportLocalsConvention: 'camelCaseOnly',
                                },
                            },
                        },
                        'sass-loader',
                    ],
                }, {
                    test: /\.css$/i,
                    use: [
                        'style-loader',
                        'css-loader',
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        plugins: plugins,
    }
};
