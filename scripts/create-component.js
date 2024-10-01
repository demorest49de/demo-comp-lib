import { exec } from 'child_process'
import fs from 'node:fs'
import fsPromises from 'node:fs/promises'

async function createComponent(name) {
  const capitalizedName = capitalizeFirstLetter(name)

  const dirPath = `./src/components/ui/${name}`
  const componentPath = `${dirPath}/${name}.tsx`
  const componentContent = `
  import s from './${name}.module.scss'
  export type ${capitalizedName}Props = {}
  
  export const ${capitalizedName} = ({}: ${capitalizedName}Props) => {
    return <div>${capitalizedName}</div>
  }
  `

  const sassPath = `${dirPath}/${name}.module.scss`
  const sassContent = ``

  const indexPath = `${dirPath}/index.ts`
  const indexContent = `export * from './${name}'`

  const storyPath = `${dirPath}/${name}.stories.tsx`
  const storyContent = `
import type { Meta, StoryObj } from '@storybook/react'

import { ${capitalizedName} } from '../../../Desktop'

const meta = {
  component: ${capitalizedName},
  tags: ['autodocs'],
  title: 'Components/${capitalizedName}',
} satisfies Meta<typeof ${capitalizedName}>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
`

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
  }

  fs.writeFileSync(componentPath, componentContent)
  fs.writeFileSync(sassPath, sassContent)
  fs.writeFileSync(indexPath, indexContent)
  fs.writeFileSync(storyPath, storyContent)

  exec(`pnpm run format:file ${dirPath}`, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return
    }

    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`)
    console.log(`stderr: ${stderr}`)
  })
  exec(`pnpm run lint:file ${dirPath}/**`, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return
    }

    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`)
    console.log(`stderr: ${stderr}`)
  })
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const name = process.argv[2]

if (!name) {
  console.log('Please provide component name')
  process.exit(1)
}

async function updateMainIndex(name) {
  const mainIndexPath = './src/components/ui/index.ts'
  const mainIndexContent = await fsPromises.readFile(mainIndexPath, 'utf-8')
  const lineToAdd = `export * from './${name}'`

  if (mainIndexContent.includes(lineToAdd)) {
    return
  }
  const mainIndexContentArray = mainIndexContent.split('\n')

  mainIndexContentArray.unshift(lineToAdd)

  fs.writeFileSync(mainIndexPath, mainIndexContentArray.join('\n'))
}

createComponent(name)
void updateMainIndex(name)
