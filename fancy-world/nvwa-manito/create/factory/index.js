// const factory = require(filepath.factoryTemplate)
const { createbase } = require('../create-base')
const chalk = require('chalk')
const logSymbols = require('log-symbols')
const { filepath } = require('../../path/configurationPath/index')
const { SocialFactory } = require(filepath.socialFactory)
exports.createByFactory = async ({ templateName, folderPath }) => {
  // 去工厂拿模版
  const factory = new SocialFactory({ templateName, folderPath })
  const { status: createStatus, templates, message: createMessage } = await factory.build()
  if (createStatus) {
    // 拿到模版之后nvwa开始创建
    const { status, message } = await createbase({ templates })
    if (status) {
      console.log(logSymbols.success, chalk.green(`Finished successfully! `))
      return {
        status
      }
    } else {
      return {
        status,
        message
      }
    }
  } else {
    return {
      status,
      message: createMessage
    }
  }
}
