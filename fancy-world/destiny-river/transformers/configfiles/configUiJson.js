const { getUiMessage } = require('../../template/UiTemplate')
const fs = require('fs')
const ora = require('ora')
const chalk = require('chalk')
const { filepath } = require('../../path/configurationPath/index.js')

const spinner = ora('Override ui configuration...')
exports.changeUi = async function({ ui } = {}) {
  spinner.start()
  let { configMini, configLess, configJson } = await getUiMessage(ui)
  const error = fs.mkdirSync(filepath.configUiPath, { recursive: true })
  if (!error) {
    const err = fs.writeFileSync(
      `${filepath.configUiPath}/index.json`,
      JSON.stringify(configJson, null, 2)
    )
    const err1 = fs.writeFileSync(`${filepath.configUiPath}/index.js`, configMini)
    const err2 = fs.writeFileSync(`${filepath.configUiPath}/index.less`, configLess)

    if (!err && !err1 && !err2) {
      spinner.stopAndPersist({
        symbol: '💋',
        prefixText: `${chalk.green('[5/5]')}`,
        text: '️Override ui configuration'
      })
      return {
        status: true
      }
    } else {
      spinner.stop()
      return {
        status: false,
        message: 'Override ui configuration error'
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
