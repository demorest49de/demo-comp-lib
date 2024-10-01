const fs = require('fs')
const fsp = fs.promises
const {join} = require("node:path")

const dirWithIcons = 'src/assets/components'

async function main() {
  const files = await fsp.readdir(dirWithIcons)

  files.forEach(async  (file) => {
    const filePath =join(dirWithIcons, file)
    const fileContent = await fsp.readFile(filePath, 'utf-8')
    const newfileContent = await fileContent.replaceAll('#000', 'currentcolor')

    fsp.writeFile(filePath, newfileContent)
  })
}

void main()
