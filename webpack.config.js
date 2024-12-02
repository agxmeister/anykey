const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = function(env, argv) {
    const plugins = [
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
        module: {
            rules: [
                {
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
        plugins: plugins,
    }
};
