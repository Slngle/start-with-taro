const fs = require('fs')
const ora = require('ora')
const chalk = require('chalk')
const { filepath } = require('../../path/configurationPath/index.js')
const utils = require('../../utils')

const spinner = ora('Override webpack entry...')
exports.changePages = async function({ pages = '' }) {
  spinner.start()
  const rewrite = await utils.updatePages()
  if (JSON.stringify(rewrite) === '{}') {
    // pageNow里面没有页面导致entry为空
    spinner.stopAndPersist({
      symbol: '💋',
      prefixText: `${chalk.red('[2/5]')}`,
      text: 'Override pages and reducers error'
    })
    return {
      status: false,
      message: 'no pages found in your entry'
    }
  }

  const error = fs.mkdirSync(filepath.pageAllPath.replace(/\/[^/]+$/, ''), { recursive: true })
  if (!error) {
    const err = fs.writeFileSync(filepath.pageAllPath, JSON.stringify(rewrite, null, 2))
    if (!err) {
      spinner.stopAndPersist({
        symbol: '💋',
        prefixText: `${chalk.green('[3/5]')}`,
        text: 'Override pages and reducers'
      })
      return {
        status: true
      }
    } else {
      spinner.stopAndPersist({
        symbol: '💋',
        prefixText: `${chalk.red('[3/5]')}`,
        text: 'Override pages and reducers error'
      })
      return {
        status: false,
        message: 'Override pages and reducers error'
      }
    }
  } else {
    return {
      status: false,
      message: 'create folder error!'
    }
  }
}
