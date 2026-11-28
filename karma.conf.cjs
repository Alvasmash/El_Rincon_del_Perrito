const fs = require('fs');

// Configuración de navegador para Windows (Chrome o Edge Chromium)
if (!process.env.CHROME_BIN) {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  if (fs.existsSync(edgePath)) {
    process.env.CHROME_BIN = edgePath;
  } else if (fs.existsSync(chromePath)) {
    process.env.CHROME_BIN = chromePath;
  }
}

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', 'webpack'],
    files: ['src/**/*.spec.js'],
    preprocessors: {
      'src/**/*.spec.js': ['webpack'],
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            resolve: { fullySpecified: false },
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  ['@babel/preset-react', { runtime: 'automatic' }],
                ],
              },
            },
          },
          { test: /\.css$/, use: ['style-loader', 'css-loader'] },
          { test: /\.(png|jpg|gif|svg)$/, type: 'asset/resource' },
        ],
      },
      resolve: { extensions: ['.js', '.jsx'], fullySpecified: false },

    },
    browsers: ['ChromeHeadless'],
    singleRun: true,
  });
};
