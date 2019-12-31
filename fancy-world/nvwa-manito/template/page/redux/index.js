const { getFormatName } = require('../../utils')
const { pageGlobal } = require('./template/page-global')
const { pageStoreActions, pageStoreReducers, pageStoreTypes } = require('./template/page-store')
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
      tempate: `{ "flow": "redux", "title": "${title}"}`
    },
    {
      folderPath: `${folderPath}/${normalName}/${normalName}-global`,
      filePath: `/index.js`,
      tempate: pageGlobal({ name: tName })
    },
    {
      folderPath: `${folderPath}/${normalName}/store/actions`,
      filePath: `/${pageTName}.js`,
      tempate: pageStoreActions({ name: pageTName })
    },
    {
      folderPath: `${folderPath}/${normalName}/store/reducers`,
      filePath: `/${pageTName}.js`,
      tempate: pageStoreReducers({ name: pageTName })
    },
    {
      folderPath: `${folderPath}/${normalName}/store/types`,
      filePath: `/${pageTName}.js`,
      tempate: pageStoreTypes({ name: pageTName })
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
