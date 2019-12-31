const path = require('path')
const fs = require('fs')

/**
 *
 * @param value
 * @returns {string}
 */
exports.resolvePath = function resolve(value) {
  return path.join(__dirname, '..', value)
}

/**
 *
 * @param value
 * @returns {string}
 */
exports.packageRoot = function resolve(value) {
  return path.join(__dirname, value)
}

/**
 *
 * @param _path
 * @returns {string}
 */
exports.assetsPath = function(_path) {
  return path.join(__dirname, '../build/', _path)
}

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

/**
 *
 * @returns {Promise<void>}
 */
exports.updatePages = async function() {
  const json = await getPageList()
  await setPageList(json)
}

/**
 *
 * @type {function()}
 */
exports.getPageList = getPageList

/**
 *
 * @returns {Promise<void>}
 */
async function getPageList() {
  const { filepath } = require('./filepath')
  const { pageArrow } = filepath
  let json = {}
  for (const data of pageArrow) {
    const folderPath = data.value
    const folderName = data.folder
    const pages = fs.readdirSync(folderPath) || []
    for (const page of pages) {
      const config = require(`${folderPath}/${page}/config.json`)
      json[`${page}`] = {
        title: config.title,
        path: `/${folderName}/${page}/index`
      }
    }
  }
  return json
}

async function setPageList(json) {
  const { filepath } = require('./filepath')
  const pageAllPath = filepath.pageAllPath
  const error = fs.mkdirSync(pageAllPath.replace(/\/[^/]+$/, ''), { recursive: true })
  if (!error) {
    fs.writeFileSync(pageAllPath, JSON.stringify(json, null, 2))
    return true
  }
  return false
}
