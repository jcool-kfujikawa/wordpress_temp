const webpack = require('webpack');
//path モジュールの読み込み
const path = require('path');
// バンドルされる CSS を別の CSS ファイルに抽出する
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// dist出力時にリセット
const CleanPlugin = require('clean-webpack-plugin');
// 環境変数の取得
const isProduction = process.env.NODE_ENV === 'production';

const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

const CopyWebpackPlugin = require('copy-webpack-plugin');

//共通の設定
const config = {
  //　エントリーポイント
  entry: {
    common: './src/lib/common.js', // 共通のJavaScript
    // その他ページを増やす場合はここに追加
  },
  output: {
    filename: './assets/js/[name]bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/images/**/*',
          to({ absoluteFilename }) {
            const relativePath = path.relative(path.resolve('src/images'), absoluteFilename);
            return `assets/images/${relativePath}`;
          },
        },
      ],
    }),
    
    new BrowserSyncPlugin({
      open: true,
      host: "localhost",
      port: 4869,
      files: [
        "../src/**/*",
        "../**/*.php"
      ],
      // Localとホストをつないでいるポートをproxyで指定
      // .localを指定するとリロードが重くなるので他の任意のURLを設定し指定
      proxy: "http://template.wp/",
      overlay: true
    }),

    // CSSを別ファイルに出力する
    new MiniCssExtractPlugin({
      filename: 'assets/css/style.css',
    }),
  ],
  module: {
    rules: [
      //sass
      {
        // ローダーの処理対象ファイル
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/, // node_modules ディレクトリを除外します
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            // options: { publicPath: '../' },
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['autoprefixer'],
                  [
                    //PostCSS Sort Media Queries（mobile-first でソート）
                    'postcss-sort-media-queries',
                    {
                      sort: 'mobile-first',
                    },
                  ],
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      // images
      {
        test: /\.(png|svg|jpe?g|gif|webp)$/i,
        generator: {
          filename: 'assets/images/[name][ext][query]',
        },
        type: 'asset/resource',
      },
      {
        // node_module内のcss
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: { url: false },
          },
        ],
      },
      {
        test: /\.js$/, // .js 拡張子のファイルに対して
        exclude: /node_modules/, // node_modules ディレクトリを除外します
        use: {
          loader: 'babel-loader', // Babelを使用してJSをトランスパイルします（必要に応じて）
        }
      }
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  devtool: 'source-map',

};

module.exports = () => {
  if (isProduction) {
    // 本番環境のときの設定
    config.mode = 'production';
    // configにプラグインの追加
    config.plugins.push(new CleanPlugin.CleanWebpackPlugin());
  }
  if (!isProduction) {
    // 開発環境のときの設定
    config.mode = 'development';
  }
  return config;
};
