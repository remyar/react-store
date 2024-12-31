#!/usr/bin/env zx
import isCI from 'is-ci'
import { usePowerShell } from 'zx'

if (process.platform === 'win32') {
    usePowerShell() // now `$.shell` refers to pwsh and `$.postfix` set to '; exit $LastExitCode' 
}

const {
    b = isCI, // pass `-b` to build if you want it to run browserslist update outside of CI environment
} = argv

if (b) {
    // Update browserslist
    await $`npx update-browserslist-db@latest`
}

console.log(chalk.blue('[BEGIN BUILD]'))
console.log(chalk.blue('Building js'))

// build distributables
await $`cross-env NODE_ENV=production rollup -c`

console.log(chalk.blue(`Compiling 'lib' js files`))
// build files used for overrides
await $`cross-env NODE_ENV=production RBC_CJS_BUILD=true babel src --out-dir lib`

console.log(chalk.blue('[BUILD COMPLETE]'))