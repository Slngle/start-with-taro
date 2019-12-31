//base
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
//less
import './index.less'
import { pagejumpoutput } from '../../../configuration/pagejump-output'

import nodata from '../../../static/images/nodata.png'

import {
  getCurrentPageList,
  navigateBack,
  reLaunch,
  switchTab
} from '../../../cross-platform/api-platform/router'

class AbnormalFlow extends Component {
  state = {
    textFormat: '',
    keytap: ''
  }

  static defaultProps = {
    styleWrap: {},
    imgLink: '',
    content: '阿欧，没有数据哦 ~',
    text: '' //text === null 就不展示按钮
  }

  componentWillMount() {
    const { text } = this.props
    if (text !== 'none') {
      this.initstate()
    }
  }

  initstate = () => {
    const { text } = this.props
    let textFormat = ''
    let keytap = ''
    if (!text) {
      const pages = getCurrentPageList()
      if (pages.length > 1) {
        textFormat = '返回'
        keytap = 'goback'
      } else {
        textFormat = '返回首页'
        keytap = 'gohomepage'
      }
    } else {
      textFormat = text
      keytap = 'nomaltap'
    }
    this.setState({
      textFormat,
      keytap
    })
  }

  onTap = () => {
    const { keytap } = this.state
    if (keytap === 'nomaltap') {
      this.props.onTap && this.props.onTap()
    } else if (keytap === 'gohomepage') {
      this.gohomepage()
    } else if (keytap === 'goback') {
      navigateBack()
    }
  }

  gohomepage() {
    if (this.props.shopType == 'category') {
      reLaunch({
        url: pagejumpoutput['home-page'].path
      })
    } else {
      switchTab({
        url: pagejumpoutput['home-page'].path
      })
    }
  }

  render() {
    const { imgLink, content, text, styleWrap } = this.props
    const { textFormat } = this.state
    return (
      <View className="abno-94065" style={styleWrap}>
        {imgLink || nodata ? (
          <Image className="abno-94065-image" src={imgLink || nodata} mode="widthFix" />
        ) : null}
        <View className="abno-94065-titlein">
          <Text className="abno-94065-titlein-text">{content}</Text>
        </View>
        {text !== 'none' ? (
          <View className="abno-94065-backbutton" onClick={this.onTap}>
            <Text className="abno-94065-backbutton-text">{textFormat}</Text>
          </View>
        ) : null}
      </View>
    )
  }
}

export default AbnormalFlow
