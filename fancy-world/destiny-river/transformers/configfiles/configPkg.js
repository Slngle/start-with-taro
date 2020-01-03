const fs = require('fs')
const ora = require('ora')
const chalk = require('chalk')
const { filepath } = require('../../path/configurationPath/index.js')

const spinner = ora('Override Pkg file...')
exports.changePkg = async function({ tag = '' }) {
  return new Promise(resolve => {
    spinner.start()
    if (!tag) {
      spinner.stopAndPersist({
        symbol: '💋️',
        prefixText: `${chalk.green('[4/5]')}`,
        text: "Pkg don't need Override"
      })
      resolve({
        status: true
      })
      return
    }

    const pkgfile = require(filepath.pkgPath)
    pkgfile.version = tag

    fs.writeFile(filepath.pkgPath, JSON.stringify(pkgfile, null, 2), function(err) {
      if (!err) {
        spinner.stopAndPersist({
          symbol: '💋',
          prefixText: `${chalk.green('[2/5]')}`,
          text: 'Override Pkg file'
        })
        resolve({
          status: true
        })
      } else {
        spinner.stop()
        resolve({
          status: false,
          message: 'Override Pkg file error'
        })
      }
    })
  })
}
