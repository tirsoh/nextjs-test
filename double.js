const readdir = require('fs-readdir-recursive')
const fs = require('fs')
const path = require('path')

const docsRoot = path.join(__dirname, 'pages/docs')

readdir(docsRoot).map(file => {
  const extname = path.extname(file)
  const newName = file.replace(new RegExp(`${extname}$`), `-c3${extname}`)
  const content = fs.readFileSync(path.join(docsRoot, file))
  fs.writeFileSync(path.join(docsRoot, newName), content)
})

// 500 pages
// 68sec, 6sec

// 1000 pages
// 124sec, 6sec

// 2000 pages
