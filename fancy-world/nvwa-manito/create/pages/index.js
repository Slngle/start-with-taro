const { createbase } = require('../create-base')
const chalk = require('chalk')
const logSymbols = require('log-symbols')
const { updatePages } = require('../../utils')

exports.createPage = async ({ name, folderPath, title, flow, path }) => {
  let templates
  if (flow == 'mobx') {
    const { getPageTempalte } = require('../../template/page/mobx')
    templates = getPageTempalte({ name, folderPath })
  } else if (flow == 'redux') {
    const { getPageTempalte } = require('../../template/page/redux')
    templates = getPageTempalte({ name, folderPath, title })
  } else {
    const { getPageTempalte } = require('../../template/page/simple')
    templates = getPageTempalte({ name, folderPath })
  }
  const { status, message } = await createbase({ templates })
  if (status) {
    console.log(
      logSymbols.success,
      chalk.green(`Finished successfully! name:${name} && title:${title}`)
    )
    // 成功之后 修改pageList.json里面的page页面
    updatePages({ name, title, flow, path })
    return {
      status
    }
  } else {
    console.log(logSymbols.error, chalk.green(`Finished error! name:${name} && title:${title}`))
    return {
      status,
      message
    }
  }
}
