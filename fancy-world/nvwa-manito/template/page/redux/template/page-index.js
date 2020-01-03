exports.pageIndex = ({ name, cssname, title, pageTName }) => {
  if (process.env.FRAMEWORK === 'web') {
    return pageIndexWeb({ name, cssname })
  } else if (process.env.FRAMEWORK === 'taro') {
    return pageIndexTaro({ name, cssname, pageTName, title })
  }
}

exports.pageCss = ({ cssname }) => {
  return `.${cssname} {
  background-color: #ffffff;
  &-wrap {
  }
}`
}

/**
 * web页面部分
 */
const pageIndexWeb = ({ name, cssname, pageTName }) => {
  return `import React, { Component } from 'react'
export default class ${name} extends Component {
  render() {
    return <div className="${cssname}">hello world!</div>
  }
}`
}

/**
 * taro页面部分
 */
const updateTypes = name => `UPDATE${name.toUpperCase()}`
const clearTypes = name => `CLEAR${name.toUpperCase()}`
const updateTypesPaging = name => `UPDATE${name.toUpperCase()}PAGING`

const pageIndexTaro = ({ name, cssname, pageTName, title }) => {
  return `import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import {
  ${updateTypes(pageTName)}REQ,
  ${updateTypesPaging(pageTName)}REQ
} from './store/actions/${pageTName}'
import { ${updateTypes(pageTName)}, ${clearTypes(pageTName)} } from './store/types/${pageTName}'
import './index.less'
import { showLoading, hideLoading } from '../../cross-platform/api-platform/viewport/interaction'
import { getWindowHeight } from '../../cross-platform/api-platform/equipment/system-info'
import NetworkError from '../../components/base-ui/network-error'
import AbnormalFlow from '../../components/base-ui/abnormal-flow'
import NavigationBar from '../../cross-platform/components-platform/customize-header'

let timer = null

const mapActiontoProps = dispatch => ({
  updateState(payload) {
    dispatch({
      type: ${updateTypes(pageTName)},
      payload: {
        ...payload
      }
    })
  },
  clearState() {
    dispatch({
      type: ${clearTypes(pageTName)}
    })
  },
  dorequest(payload) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      showLoading({
        title: '玩命加载中'
      })
    }, 2000)
    return new Promise(resolve => {
      let promise = ${updateTypes(pageTName)}REQ(payload)
      dispatch(promise)
      promise.payload.then(data => {
        clearTimeout(timer)
        timer = null
        hideLoading()
        resolve(data)
      })
    })
  },
  queryPaging(payload) {
      let promise = ${updateTypesPaging(pageTName)}REQ(payload)
      dispatch(promise)
      return promise.payload.then
  }
})

@connect(
  ({ ${pageTName} }) => ({
    ...${pageTName}
  }),
  mapActiontoProps
)
export default class ${name} extends Component {
  static defaultProps = {
    dataSource: []
  }
  
  inRequest = false
  
  config = {
    navigationStyle: 'custom',
    navigationBarTitleText: '${title}',
    disableScroll: true
  }
  
  componentWillMount() {
    if (process.env.TARO_ENV === 'h5') {
      document.title = '${title}'
    }
    this.queryWrap()
  }
  
  componentDidMount() {}
  
  componentDidShow() {}
  
  componentDidHide() {}
  
  componentWillUnmount() {
    this.props.clearState()
  }
  
  queryWrap = () => {
    this.props.dorequest()
  }
  
  onReload = () => {
    this.queryWrap()
  }
  
  onScrollToLower = () => {
    const { hasNextPage, pageSize, pageNum } = this.props
    if (!this.inRequest && hasNextPage) {
      this.inRequest = true
      this.props.queryPaging({ pageSize, pageNum: pageNum + 1 }).then(() => {
        this.inRequest = false
      })
    }
  }
  
  render() {
  
    const { dataSource, showEmpty } = this.props
    const style = {
      height: getWindowHeight(false, true)
    }
    
    return (
      <View className="${cssname}">
        <NavigationBar navigationBarTitle="${title}" goback />
        <NetworkError visible={this.props.networkError} onReload={this.onReload} />
        {!this.props.networkError ? (
          <View className="${cssname}-wrap" style={style}>
            {showEmpty ? (
              <AbnormalFlow text="none" />
            ) : (
              <ScrollView style={style} scrollY onScrollToLower={this.onScrollToLower}>
                <Text>hello world!</Text>
              </ScrollView>
            )}
          </View>
        ) : null}
      </View>
    )
  }
}`
}
