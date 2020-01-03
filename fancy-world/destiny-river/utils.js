const { filepath } = require('./path/configurationPath/index')
const utils = require('../utils')

exports.resolvePath = function resolve(value) {
  return utils.resolvePath(value)
}

exports.assetsPath = function(_path) {
  return utils.assetsPath(_path)
}

exports.updatePages = utils.updatePages
/**
 * formatEnv 格式化npm script的参数
 */
exports.formatEnv = function() {
  const npm_config_argv = process.env.npm_config_argv
  const user_agent = process.env.npm_config_user_agent
  let original = []
  try {
    const parseArgv = JSON.parse(npm_config_argv)
    if (/yarn/.test(user_agent)) {
      original = parseArgv.original
    } else {
      original = parseArgv.original
    }
  } catch (e) {}
  let argv = {}
  let nowKey = ''
  original.forEach(data => {
    const re = /^--/
    if (re.test(data)) {
      nowKey = data.replace(re, '')
      argv[nowKey] = ''
    } else {
      if (nowKey) {
        argv[nowKey] = argv[nowKey] ? `${argv[nowKey]} ${data}` : `${data}`
      }
    }
  })
  return {
    argv
  }
}
