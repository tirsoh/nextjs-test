const path = require('path')

module.exports = {
  exportPathMap: function() {
    return { '/': { page: '/' } }
  },
  webpack: config => {
    config.module.rules.push(
      {
        test: /(?<!(global))\.css$/,
        use: [
          {
            loader: 'emit-file-loader',
            options: { name: 'dist/[path][name].[ext].js' }
          },
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              extends: path.resolve(__dirname, './babel.config.js')
            }
          },
          { loader: 'styled-jsx-css-loader' }
        ]
      },
      {
        test: /(?:global)\.css$/,
        use: [
          {
            loader: 'emit-file-loader',
            options: { name: 'dist/[path][name].[ext].js' }
          },
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              extends: path.resolve(__dirname, './babel.config.js')
            }
          },
          {
            loader: 'styled-jsx-css-loader',
            options: { global: true }
          }
        ]
      }
    )

    return config
  }
}
