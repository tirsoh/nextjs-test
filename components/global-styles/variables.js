const vars = {
  // typography
  'klavika-font': "'klavika-web', Helvetica, sans-serif",
  'open-sans-font': "'open-sans', 'Open Sans', sans-serif",
  'monospace-font': "'Fira Mono', monospace",
  'default-font-size': '16px',
  'font-weight-reg': '400',
  'font-weight-bold': '600',
  // shades of gray, dark to light
  black: '#000000',
  'gray-1': '#0f1013',
  'gray-2': '#1d1f25',
  'gray-3': '#373942',
  'gray-4': '#4e515d',
  'gray-5': '#6a6d7a',
  'gray-6': '#9396a2',
  'gray-7': '#b6b8c2',
  'gray-8': '#d2d4db',
  'gray-9': '#e5e6eb',
  'gray-10': '#f7f8fa',
  white: '#ffffff',
  // Input Field Colors
  'input-background-light': '#ffffff',
  'input-background-dark': '#1b212d',
  'input-border-light': '#b6b8c2',
  'input-border-dark': '#262e42',
  'input-placeholder-color': '#4e515d',
  // Grid/Layout Settings
  'site-max-width': '1288px',
  column: '5.46875%',
  gutter: '3.125%',
  'full-column': '8.59375%',
  // Product Colors
  'default-blue': '#1563ff',
  'default-blue-dark': '#08368b',
  'nomad-green': '#00bc7f',
  'nomad-green-dark': '#005738',
  'terraform-purple': '#5f43e9',
  'teraform-purple-dark': '#2a1c73',
  'consul-pink': '#ca2171',
  'consul-pink-dark': '#650d34',
  'vault-gray': '#797e8d',
  'vault-gray-dark': '#22242e',
  'packer-blue': '#00acff',
  'packer-blue-dark': '#005283'
}

Object.keys(vars).map(k => {
  vars[`--${k}`] = vars[k]
  delete vars[k]
})

module.exports = vars
