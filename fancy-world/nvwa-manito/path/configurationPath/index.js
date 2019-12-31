const rootPath = `${__dirname}/../..`
const { filepath } = require(`${rootPath}/../filepath`)

exports.filepath = {
  pageArrow: filepath.pageArrow,
  pageArrowProcess: filepath.pageArrowProcess,
  componentArrow: filepath.componentArrow,
  pageAllPath: filepath.pageAllPath,
  factoryTemplate: filepath.factoryTemplate,
  socialFactory: filepath.socialFactory
}
