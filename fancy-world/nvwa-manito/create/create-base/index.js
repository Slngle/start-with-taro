const fs = require('fs')

const mkdir = (path, options = {}) => {
  return new Promise(resolve => {
    fs.mkdir(path, options, err => {
      resolve(err)
    })
  })
}

const writeFile = (path, tempate = '') => {
  return new Promise(resolve => {
    fs.writeFile(path, tempate, err => {
      resolve(err)
    })
  })
}

const createSingle = async ({ folderPath, filePath, tempate }) => {
  const errFolder = await mkdir(folderPath, { recursive: true })
  if (!errFolder || errFolder.code === 'EEXIST') {
    const errFile = await writeFile(folderPath + filePath, tempate)
    if (!errFile) {
      return {
        status: true
      }
    } else {
      return {
        status: false,
        message: `${filePath} 创建失败！`
      }
    }
  } else {
    return {
      status: false,
      message: `${folderPath} 创建失败！`
    }
  }
}

exports.createbase = async ({ templates }) => {
  for (const data of templates) {
    const { status, message } = await createSingle(data)
    if (!status) {
      return {
        status,
        message
      }
    }
  }
  return {
    status: true
  }
}
