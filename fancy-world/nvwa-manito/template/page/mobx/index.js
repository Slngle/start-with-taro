const { getFormatName } = require('../../utils')
const { pageGlobal } = require('./template/page-global')
const { pageStoreRoot, pageStoreIndex } = require('./template/page-store')
const { pageIndex, pageCss } = require('./template/page-index')

exports.getPageTempalte = ({ name, folderPath }) => {
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
      tempate: `{ flow: 'mobx' }`
    },
    {
      folderPath: `${folderPath}/${normalName}/${normalName}-global`,
      filePath: `/index.js`,
      tempate: pageGlobal({ name: tName })
    },
    {
      folderPath: `${folderPath}/${normalName}/store`,
      filePath: `/root.js`,
      tempate: pageStoreRoot({ name: pageTName })
    },
    {
      folderPath: `${folderPath}/${normalName}/store`,
      filePath: `/${pageTName}.js`,
      tempate: pageStoreIndex({ name: pageTName })
    },
    {
      folderPath: `${folderPath}/${normalName}`,
      filePath: `/index.js`,
      tempate: pageIndex({ name: tName, cssname: cssUniName })
    },
    {
      folderPath: `${folderPath}/${normalName}`,
      filePath: `/index.less`,
      tempate: pageCss({ cssname: cssUniName })
    }
  ]
}
