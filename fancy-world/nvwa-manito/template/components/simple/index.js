const { getFormatName } = require('../../utils')
const { componet, compontCss } = require('./template/index')

exports.getComponentTempalte = ({ name, folderPath }) => {
  const { normalName, tName, cssUniName } = getFormatName({ name })
  return [
    {
      filePath: `/index.js`,
      folderPath: `${folderPath}/${normalName}`,
      tempate: componet({ name: tName, cssname: cssUniName })
    },
    {
      filePath: `/index.less`,
      folderPath: `${folderPath}/${normalName}`,
      tempate: compontCss({ cssname: cssUniName })
    }
  ]
}
