const fs = require('fs')
const fsp = fs.promises
const {join} = require("node:path")

const dirWithIcons = 'src/assets/svg'

async function main() {
  const files = await fsp.readdir(dirWithIcons)

  files.forEach((file) => {
    const newName = file.replaceAll(' ', '-').replaceAll('(', '').replaceAll(')', '').toLowerCase()

    fsp.rename(join(dirWithIcons, file), join(dirWithIcons, newName))
  })
}

void main()
