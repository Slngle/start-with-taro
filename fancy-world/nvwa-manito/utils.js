const glob = require('glob')
const fs = require('fs')
const utils = require('../utils')

const getEntries = function(globPath) {
  let files = glob.sync(globPath) || []
  return files
}

exports.packageRoot = function resolve(value) {
  return utils.packageRoot(value)
}

exports.updatePages = function() {
  utils.updatePages()
}

exports.getPageList = async function() {
  return await utils.getPageList()
}

exports.showBaseAllow = function({ allow } = {}) {
  let choices = []
  if (typeof allow == 'object') {
    allow.forEach(data => {
      let databeauty = data.split('src')[1]
      choices.push({ name: 'src' + databeauty, value: data })
    })
  } else {
    const path = getEntries(allow)
    path.forEach(data => {
      let databeauty = data.split('src')[1]
      choices.push({ name: 'src' + databeauty, value: data })
    })
  }
  return choices
}
