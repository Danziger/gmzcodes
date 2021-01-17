const path = require('path');
const childProcess = require('child_process');

const hasha = require('hasha');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, {
  mode,
}) => {
  const DEV = /development|dev/i.test(mode);
  const PROD = /production|prod/i.test(mode);
  const COMMIT_HASH = childProcess.execSync('git rev-parse HEAD').toString().trim();
  const BUILD_DATE = new Date();

  const config = {
    devtool: DEV ? 'eval-source-map' : 'source-map',

    entry: {
      main: [
        './src/app/main.js',
        './src/app/main.scss',
      ],
    },

    output: {
      filename: PROD ? '[name].[contenthash].js' : '[name].[hash].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: './',
    },

    devServer: {
      contentBase: path.resolve(__dirname, 'static'),
      publicPath: '/',
      // When sharing the site using ssh -R 80:localhost:8080 ssh.localhost.run
      // disableHostCheck: true,
    },

    module: {
      rules: [{
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: {
            fix: true,
          },
        },
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: false,
            rootMode: 'upward',
          },
        }],
      }, {
        test: /\.scss/,
        use: [
          // process.env.NODE_ENV !== 'production'
          // ? 'style-loader'
          // : MiniCssExtractPlugin.loader,
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      }, {
        test: /\.ejs$/,
        exclude: /node_modules/,
        use: {
          loader: 'ejs-compiled-loader',
        },
      }],
    },

    plugins: [
      new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, 'dist/index.html'),
        template: path.resolve(__dirname, 'src/app/components/app/app.template.ejs'),
        favicon: path.resolve(__dirname, 'static/favicon.ico'),
        inlineSource: '.css$', // Inline JS and CSS.
      }),

      new WorkboxWebpackPlugin.GenerateSW({

        cleanupOutdatedCaches: true,

        // Do not precache images or fonts
        exclude: [/\.(?:png|jpg|jpeg|gif|svg|woff2)$/],

        additionalManifestEntries: [{
          url: 'manifest.json',
          revision: hasha.fromFileSync('./static/manifest.json'),
        }, {
          url: 'dani-gamez-franco-cv-2020.07.12.pdf',
          revision: hasha.fromFileSync('./static/dani-gamez-franco-cv-2020.07.12.pdf'),
        }],

        // Define runtime caching rules:
        runtimeCaching: [{
          urlPattern: /\.(?:png|jpg|jpeg|gif|svg|woff2)$/,
          handler: 'CacheFirst',

          options: {
            cacheName: 'images',

            expiration: {
              maxEntries: 16,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            },
          },
        }, {
          urlPattern: /^https:\/\/fonts\.googleapis\.com/,
          handler: 'StaleWhileRevalidate',

          options: {
            cacheName: 'google-fonts-stylesheets',

            expiration: {
              maxEntries: 4,
            },
          },
        }, {
          urlPattern: /^https:\/\/fonts\.gstatic\.com/,
          handler: 'CacheFirst',

          options: {
            cacheName: 'google-fonts-webfonts',

            cacheableResponse: {
              statuses: [0, 200],
            },

            expiration: {
              maxEntries: 30,
              maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
            },
          },
        }],
      }),

      new MiniCssExtractPlugin({
        filename: PROD ? '[name].[contenthash].css' : '[name].[hash].css',
      }),

      new StyleLintPlugin({
        syntax: 'scss',
        fix: true,
      }),

      new CopyWebpackPlugin([{
        from: 'static',
      }]),

      // Defines variables available globally that Webpack can evaluate in compilation time and remove dead code:
      new webpack.DefinePlugin({}),

      // Same as before, but sets properties inside `process.env` specifically:
      new webpack.EnvironmentPlugin({
        DEV,
        PROD,
        BUILD_DATE,
        COMMIT_HASH,
      }),

      // new BundleAnalyzerPlugin(),
    ],

    optimization: {
      // Extract all styles in a single file:
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },

      minimizer: PROD ? [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: PROD,
          extractComments: false,
          terserOptions: {
            compress: {
              drop_console: false,
            },
            output: {
              comments: false,
            },
          },
        }),

        // Might not be needed with Webpack 5:
        new OptimizeCSSAssetsPlugin({}),
      ] : [],
    },
  };

  if (PROD) {
    // TODO: Should I replace this with https://stackoverflow.com/questions/61490604/inline-css-with-webpack-without-htmlwebpackinlinesourceplugin?
    config.plugins.push(new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin));
  }

  return config;
};
