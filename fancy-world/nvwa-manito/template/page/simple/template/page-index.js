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

const pageIndexTaro = ({ name, cssname, pageTName, title }) => {
  return `import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import './index.less'
import { getWindowHeight } from '../../cross-platform/api-platform/equipment/system-info'
import NetworkError from '../../components/base-ui/network-error'
import AbnormalFlow from '../../components/base-ui/abnormal-flow'
import NavigationBar from '../../cross-platform/components-platform/customize-header'

export default class ${name} extends Component {
  state = {
    dataSource: [],
    networkError: false,
    hasNextPage: false,
    pageSize: 20,
    pageNum: 1
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
    //dorequest()
  }
  
  onReload = () => {
    this.queryWrap()
  }
  
  onScrollToLower = () => {
    const { hasNextPage, pageSize, pageNum } = this.state
    if (!this.inRequest && hasNextPage) {
      this.inRequest = true
      //this.queryPaging({ pageSize, pageNum: pageNum + 1 }).then(() => {
        //this.inRequest = false
      //})
    }
  }
  
  render() {
  
    const style = {
      height: getWindowHeight(false, true)
    }
    
    return (
      <View className="${cssname}">
        <NavigationBar navigationBarTitle="${title}" goback />
        <NetworkError visible={this.state.networkError} onReload={this.onReload} />
        {!this.props.networkError ? (
          <View className="${cssname}-wrap" style={style}>
            <ScrollView style={style} scrollY onScrollToLower={this.onScrollToLower}>
                <Text>hello world!</Text>
              </ScrollView>
          </View>
        ) : null}
      </View>
    )
  }
}`
}
