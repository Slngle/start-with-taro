const rootPath = `${__dirname}/../..`
const { filepath } = require(`${rootPath}/../filepath`)

exports.filepath = {
  configEnvPath: filepath.configEnvPath,
  configKaPath: filepath.configKaPath,
  configUiPath: filepath.configUiPath,
  pkgPath: filepath.pkgPath,
  pageAllPath: filepath.pageAllPath,
  entry: filepath.entry
}
