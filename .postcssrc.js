module.exports = {
  plugins: {
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': true,
        'custom-properties': { preserve: false }
      },
      importFrom: {
        customProperties: {
          '--defaultBlue': '#1563ff'
        }
      }
    }
  }
}
