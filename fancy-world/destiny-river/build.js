const { formatEnv } = require('./utils')
const ora = require('ora')
const chalk = require('chalk')
const { Transformers } = require('./transformers/index')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const webpackConfig = require('./webpack/webpack.prod')

const spinner = ora('start transform files...')
const { argv } = formatEnv()

spinner.start()
new Transformers({ argv, position: 'online' })
  .init()
  .then(({ status, message }) => {
    if (status) {
      spinner.stopAndPersist({
        symbol: '🚚',
        prefixText: `\r\n${chalk.green('success')}`,
        text: message
      })
      if (argv.analyzer !== undefined) {
        webpackConfig.plugins.push(new BundleAnalyzerPlugin())
      }
      // 开始编译
      const spinner1 = ora('start building...')
      spinner1.start()
      const Start = spawn('yarn', [`${argv.type}`], { stdio: 'inherit' }, (err, stdout, stderr) => {
        if (err) {
          console.error(`exec error: ${err}`)
          spinner1.stop()
          process.exit(1)
          return
        }
      })
    } else {
      spinner.fail(message)
    }
  })
  .catch(ex => {
    spinner.fail('Something went wrong!')
  })
