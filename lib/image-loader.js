module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      const { isServer } = options
       config.module.rules.push({
        test: /\.(jpe?g|png|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: `/_next/static/images/`,
              outputPath: `${isServer ? '../' : ''}static/images/`,
              name: '[name].[ext]'
            }
          }
        ]
      })
       if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }
       return config
    }
  })
}
