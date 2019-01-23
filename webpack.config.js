const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = (env) => {
  return {
      mode: (env==='dev')?'development': 'production',
      module: {
        rules: [
          {
            test: /\.js?$/,
            include: path.join(__dirname, '/src'),
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
              presets: ["react", "env", "stage-1"]
            }
          },
          {
            test: /\.scss$/,
            use: [
                "style-loader",
                "css-loader",
                "sass-loader"
            ]
          },
          {
            test: /\.css$/,
            use: [
                "style-loader",
                "css-loader"
            ]
          }
        ],
      },
      entry: path.join(__dirname, '/src/index.js'),
      output: {
        path: path.join(__dirname, '/build/js'),
        filename: 'app.js',
      },
      watch: env==='dev',
      plugins: [
        new CompressionPlugin({
          asset: "[path].gz[query]",
          algorithm: "gzip",
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240,
          minRatio: 0.8
        })
      ],
      performance: {
        hints: false
      }
  };
}