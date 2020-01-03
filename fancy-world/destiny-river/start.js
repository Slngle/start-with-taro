const { formatEnv } = require('./utils')
const ora = require('ora')
const chalk = require('chalk')
const { Transformers } = require('./transformers/index')
const { spawn } = require('child_process')

const spinner = ora('start transform files')
const { argv } = formatEnv()

spinner.start()
if (!argv.env) {
  argv.env = 'daily'
}

new Transformers({ argv, position: 'devserver' })
  .init()
  .then(({ status, message }) => {
    if (status) {
      spinner.stopAndPersist({
        symbol: '🚚',
        prefixText: `\r\n${chalk.green('success')}`,
        text: message
      })

      const Start = spawn(
        'yarn',
        [`dev:${argv.type}`],
        { stdio: 'inherit' },
        (err, stdout, stderr) => {
          if (err) {
            console.error(`exec error: ${err}`)
            process.exit(1)
            return
          }
        }
      )
    } else {
      spinner.fail(message)
    }
  })
  .catch(ex => {
    console.log(ex, 'ex')
    spinner.fail('Something went wrong!')
  })
