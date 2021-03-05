import fs from 'fs'
import { resolveProjectPath } from './utils'

// main.(js|jsx|ts|tsx)
export default () => {
  const supportEntrySuffixs = ['js', 'jsx', 'ts', 'tsx']
  for (const suffix of supportEntrySuffixs) {
    const path = resolveProjectPath(`src/main.${suffix}`)
    if (fs.existsSync(path)) {
      return path
    }
  }
}
