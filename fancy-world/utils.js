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
  await setRootReduce()
  return await setPageList(json)
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
async function setRootReduce() {
  const reducersList = await getReducerList()
  return await setReducerList(reducersList)
}

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

/**
 * @desc 获取reducer
 * @returns {Promise<Array>}
 */
async function getReducerList() {
  const { filepath } = require('./filepath')
  const { pageArrow } = filepath
  let reducersList = []
  for (const data of pageArrow) {
    const folderPath = data.value
    const folderName = data.folder
    const pages = fs.readdirSync(folderPath) || []
    for (const page of pages) {
      const inPageName = fs.readdirSync(`${folderPath}/${page}`)
      if (inPageName && inPageName.includes('store')) {
        const reducers = fs.readdirSync(`${folderPath}/${page}/store/reducers`)
        reducers.forEach(reducerName => {
          reducersList.push({
            name: reducerName.replace(/\.js/, ''),
            path: `../../${folderName}/${page}/store/reducers/${reducerName}`
          })
        })
      }
    }
  }
  const storePath = filepath.storePath
  const reducerGloble = fs.readdirSync(`${storePath}`)
  reducerGloble.forEach(reducerName => {
    if (reducerName != 'index.js') {
      reducersList.push({
        name: reducerName.replace(/\.js/, ''),
        path: `./${reducerName}`
      })
    }
  })
  return reducersList
}

async function setPageList(json) {
  const { filepath } = require('./filepath')
  const pageAllPath = filepath.pageAllPath
  const error = fs.mkdirSync(pageAllPath.replace(/\/[^/]+$/, ''), { recursive: true })
  if (!error) {
    fs.writeFileSync(pageAllPath, JSON.stringify(json, null, 2))
    return json
  }
  return {}
}

async function setReducerList(list = []) {
  const { filepath } = require('./filepath')
  const storePath = filepath.storePath
  let importT = ''
  let reducerT = ''
  list.forEach(data => {
    importT += `import ${data.name} from '${data.path}'\r\n`
    reducerT += `${data.name},`
  })
  let template = `import { combineReducers } from 'redux'
  ${importT}
  export default combineReducers({
    ${reducerT}
  })`
  fs.writeFileSync(`${storePath}/index.js`, template)
  return true
}
