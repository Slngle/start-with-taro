const { changeEnv } = require('./configfiles/configEnvJson')
const { changePages } = require('./configfiles/configPageJson')
const { changePkg } = require('./configfiles/configPkg')
const { changeKa } = require('./configfiles/configKaJson')
const { changeUi } = require('./configfiles/configUiJson')

/*
 * 主要是打包或者本地起服务起到变换形态作用
 * @params( argv | position )
 *
 * argv 主要是npm scripts所带参数
 * 有 --env;--pages;--tag;--ka;--ui
 * ka orgid
 * ui ui模版的id
 * env:( daily | gray | master) 每次运行时会根据env的值设置configEnv（方法在configEnvJson里面）
 * pages:( allpages | xxx xxx xxx ) 每次运行时会根据pages的值设置pageNow.json （方法在configPageJson里面）
 * tag:(x.x.x) 主要是控制版本 暂时写入package.json里面的version。注position = 'online'且env=master情况下 必须要传tag（主要为了代码切割时候webpack 设置publicPath的东西）
 *
 * position(online|devserver)
 * 当前为本地，还是打包到线上去
 * */
class Transformers {
  constructor({ argv = {}, position = 'dev' } = {}) {
    this.env = (argv && argv.env) || 'master'
    this.pages = (argv && argv.pages) || 'allpages'
    this.tag = argv && argv.tag
    this.ka = argv && argv.ka
    this.ui = argv && argv.ui
    this.position = position
  }

  async before() {
    // 发布master必须带tag
    return !(this.env === 'master' && !this.tag && this.position === 'online')
  }

  async init() {
    const success = await this.before()
    if (success) {
      // 配置configEnv 配置pagesNow 配置package.json
      const { status: envStatus, message: envMessage } = await changeEnv({
        env: this.env,
        position: this.position
      })
      const { status: kaStatus, message: kaMessage } = await changeKa({ ka: this.ka })
      const { status: pagesStatus, message: pagesMessage } = await changePages({
        pages: this.pages
      })
      const { status: pkgStatus, message: pkgMessage } = await changePkg({
        tag: this.tag
      })
      const { status: uiStatus, message: uiMessage } = await changeUi({ ui: this.ui })
      if (!uiStatus) {
        return {
          status: false,
          message: uiMessage
        }
      } else if (!kaStatus) {
        return {
          status: false,
          message: kaMessage
        }
      } else if (!envStatus) {
        return {
          status: false,
          message: envMessage
        }
      } else if (!pagesStatus) {
        return {
          status: false,
          message: pagesMessage
        }
      } else if (!pkgStatus) {
        return {
          status: false,
          message: pkgMessage
        }
      } else {
        return {
          status: true,
          message: 'All tasks completed!'
        }
      }
    } else {
      return {
        status: false,
        message: '发布master必须带tag'
      }
    }
  }
}

exports.Transformers = Transformers
