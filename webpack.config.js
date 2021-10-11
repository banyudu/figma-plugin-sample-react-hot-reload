/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')
const path = require('path')
const webpack = require('webpack')
const EslintPlugin = require('eslint-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const PORT = Number(process.env.PORT) || 8000

process.env.NODE_ENV = process.env.NODE_ENV.replace(/^\s*|\s*$/g, '')

const postCssConfig = {
  loader: require.resolve('postcss-loader'),
  options: {
    postcssOptions: {
      ident: 'postcss',
      plugins: [
        require('postcss-flexbugs-fixes'),
        require('postcss-preset-env')({
          autoprefixer: {
            flexbox: 'no-2009',
          },
          stage: 3,
        }),
      ],
    },
  },
}

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'
  return {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? false : 'inline-source-map',
    entry: {
      ui: './src/ui.tsx',
      code: './src/code.ts',
    },

    module: {
      strictExportPresence: true,
      rules: [
        {
          oneOf: [
            {
              test: /\.(js|mjs|jsx|ts|tsx)$/,
              include: path.resolve('./src'),
              loader: require.resolve('babel-loader'),
              options: {
                customize: require.resolve(
                  'babel-preset-react-app/webpack-overrides',
                ),
                presets: [[require.resolve('babel-preset-react-app')]],
                plugins: [
                  [
                    require.resolve('babel-plugin-import'),
                    {
                      libraryName: 'antd',
                      style: 'css',
                    },
                  ],
                  [
                    require.resolve('babel-plugin-named-asset-import'),
                    {
                      loaderMap: {
                        svg: {
                          ReactComponent:
                            '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                        },
                      },
                    },
                  ],
                  [
                    '@babel/plugin-transform-runtime',
                    {
                      regenerator: true,
                    },
                  ],
                  'react-hot-loader/babel',
                ],
                babelrc: false,
                configFile: false,
                cacheDirectory: true,
                cacheCompression: false,
                compact: isProduction,
              },
            },
            {
              test: /\.css$/,
              use: [
                require.resolve('style-loader'),
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1,
                  },
                },
                {
                  ...postCssConfig,
                },
              ],
            },
            {
              test: /\.less$/,
              use: [
                require.resolve('style-loader'),
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 2,
                  },
                },
                {
                  ...postCssConfig,
                },
                {
                  loader: require.resolve('less-loader'),
                  options: {
                    lessOptions: {
                      javascriptEnabled: true,
                    },
                  },
                },
              ],
            },
            {
              test: /\.(png|jpg|gif|webp|svg)$/,
              loader: 'url-loader',
            },
          ],
        },
      ],
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      alias: {
        'react-dom': '@hot-loader/react-dom',
      },
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: `http://localhost:${PORT}/`,
    },

    plugins: [
      new EslintPlugin({
        extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
        eslintPath: require.resolve('eslint'),
        cache: true,
      }),
      new HtmlWebpackPlugin({
        template: './src/ui.html',
        filename: 'ui.html',
        chunks: ['ui'],
        inject: 'body',
      }),
      isProduction && new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/ui/]),
      new webpack.EnvironmentPlugin({
        REACT_FIGMA_EXPERIMENTAL: 'REACT_FIGMA_EXPERIMENTAL',
        MOCK: 'MOCK',
        BASE_URL: 'BASE_URL',
      }),
      process.env.ANALYZE && new BundleAnalyzerPlugin(),
    ].filter(Boolean),

    devServer: isProduction
      ? undefined
      : {
          port: PORT,
          host: '0.0.0.0',
          allowedHosts: 'all',
          hot: true,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods':
              'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          },
          client: {
            webSocketURL: `ws://127.0.0.1:${PORT}/ws`,
          },
        },
  }
}
