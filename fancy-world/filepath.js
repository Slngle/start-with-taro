const { resolvePath, packageRoot } = require('./utils')

exports.filepath = {
  // 路径
  entry: resolvePath('./src/.entry'), // 打包入口
  socialFactory: packageRoot('./social-factory/index.js'), // 社会工厂模版
  factoryTemplate: packageRoot('./social-factory/path/factoryTemp.json'), // 社会工厂模版
  configEnvPath: packageRoot('./dimension-eyes/env-control/index.json'), // 环境配置（host等等）
  configKaPath: packageRoot('./dimension-eyes/ka-control/index.json'), // ka的区别配置 kaId 定制化等等
  configUiPath: packageRoot('./dimension-eyes/ui-control/index.json'), // ui的配置
  pageAllPath: packageRoot('../src/configuration/config-pages/index.json'), // 所有页面的json
  pkgPath: resolvePath('./package.json'), // package.json
  pageConfig: '/config.json', // 页面的config文件地址
  pageArrow: [
    // 允许创建页面的路径
    {
      name: 'src/pages',
      folder: 'pages',
      value: resolvePath('./src/pages')
    }
  ],
  pageArrowProcess: [
    // 允许加工页面的路径
    {
      name: 'src/pages',
      value: `${resolvePath('./src/pages')}`
    }
  ],
  componentArrow: [
    // 允许创建组件的路径
    {
      name: 'src/pages',
      value: `${resolvePath('./src/pages/**/components')}`
    },
    {
      name: 'src/components',
      value: [
        `${resolvePath('./src/components/base-ui')}`,
        `${resolvePath('./src/components/page-part')}`
      ]
    }
  ]
}
