const { createbase } = require('../create-base')
const chalk = require('chalk')
const logSymbols = require('log-symbols')

exports.createComponent = async ({ name, folderPath }) => {
  const { getComponentTempalte } = require('../../template/components/simple')
  const templates = getComponentTempalte({ name, folderPath })
  const { status, message } = await createbase({ templates })
  if (status) {
    console.log(logSymbols.success, chalk.green(`Finished successfully! component-name:${name}`))
    return {
      status
    }
  } else {
    return {
      status,
      message
    }
  }
}
