module.exports = {
  presets: [
    [
      'next/babel',
      {
        'styled-jsx': {
          plugins: ['styled-jsx-plugin-postcss']
        },
        'preset-env': {
          modules: 'commonjs'
        }
      }
    ]
  ]
}
