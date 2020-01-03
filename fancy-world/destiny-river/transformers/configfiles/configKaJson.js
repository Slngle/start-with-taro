const { getKaMessage } = require('../../template/kaTemplate')
const fs = require('fs')
const ora = require('ora')
const chalk = require('chalk')
const { filepath } = require('../../path/configurationPath/index.js')

const spinner = ora('Override ka configuration...')
exports.changeKa = async function({ ka } = {}) {
  spinner.start()
  let rewrite = await getKaMessage(ka)
  const error = fs.mkdirSync(filepath.configKaPath.replace(/\/[^/]+$/, ''), { recursive: true })
  if (!error) {
    const err = fs.writeFileSync(filepath.configKaPath, JSON.stringify(rewrite, null, 2))
    if (!err) {
      spinner.stopAndPersist({
        symbol: '💋',
        prefixText: `${chalk.green('[2/5]')}`,
        text: '️Override ka configuration'
      })
      return {
        status: true
      }
    } else {
      spinner.stop()
      return {
        status: false,
        message: 'Override ka configuration error'
      }
    }
  } else {
    spinner.stop()
    return {
      status: false,
      message: 'create folder error!'
    }
  }
}
