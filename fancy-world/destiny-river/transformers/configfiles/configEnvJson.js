const { envDaily, envGray, envMaster } = require('../../template/envTemplate/index')
const fs = require('fs')
const ora = require('ora')
const chalk = require('chalk')
const { filepath } = require('../../path/configurationPath/index.js')

const spinner = ora('Override env configuration...')
exports.changeEnv = async function({ env = '', position }) {
  spinner.start()
  let rewrite = ''
  if (env == 'daily') {
    rewrite = envDaily
  } else if (env == 'gray') {
    rewrite = envGray
  } else {
    rewrite = envMaster
  }
  if (position === 'online') {
    // 生产环境直接用host
    rewrite.API_URL = ''
  }
  const error = fs.mkdirSync(filepath.configEnvPath.replace(/\/[^/]+$/, ''), { recursive: true })
  if (!error) {
    const err = fs.writeFileSync(filepath.configEnvPath, JSON.stringify(rewrite, null, 2))
    if (!err) {
      spinner.stopAndPersist({
        symbol: '💋',
        prefixText: `${chalk.green('[1/5]')}`,
        text: '️Override env configuration'
      })
      return {
        status: true
      }
    } else {
      spinner.stop()
      return {
        status: false,
        message: 'Override env configuration error'
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
