const { getFormatName } = require('../../utils')
const { pageGlobal } = require('./template/page-global')
const { pageIndex, pageCss } = require('./template/page-index')

exports.getPageTempalte = ({ name, folderPath, title }) => {
  const { normalName, tName, pageTName, cssUniName } = getFormatName({ name })
  return [
    {
      filePath: `/readme.md`,
      folderPath: `${folderPath}/${normalName}/components`,
      tempate: `#### ${normalName} 内部组件文档`
    },
    {
      filePath: `/config.json`,
      folderPath: `${folderPath}/${normalName}`,
      tempate: `{ "flow": "" }`
    },
    {
      folderPath: `${folderPath}/${normalName}/${normalName}-global`,
      filePath: `/index.js`,
      tempate: pageGlobal({ name: tName })
    },
    {
      folderPath: `${folderPath}/${normalName}`,
      filePath: `/index.js`,
      tempate: pageIndex({ name: tName, pageTName, cssname: cssUniName, title })
    },
    {
      folderPath: `${folderPath}/${normalName}`,
      filePath: `/index.less`,
      tempate: pageCss({ cssname: cssUniName })
    }
  ]
}
