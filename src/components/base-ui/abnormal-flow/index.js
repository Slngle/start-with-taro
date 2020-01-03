//base
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
//less
import './index.less'
import {
  getCurrentPageList,
  navigateBack,
  switchTab
} from '../../../cross-platform/api-platform/router'
import { configMini } from '../../../configuration/config-ui'

class AbnormalFlow extends Component {
  state = {
    textFormat: '',
    keytap: ''
  }

  static defaultProps = {
    styleWrap: {},
    imgLink: '',
    content: '阿欧，没有数据哦 ~',
    text: 'none' //text === none 就不展示按钮
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
      this.goHomepage()
    } else if (keytap === 'goback') {
      navigateBack()
    }
  }

  goHomepage() {
    const pages = require('../../../configuration/config-pages/index.json')
    switchTab({
      url: pages['home-page'].path
    })
  }

  render() {
    const { imgLink, content, text, styleWrap } = this.props
    const { textFormat } = this.state
    return (
      <View className="abno-94065" style={styleWrap}>
        {imgLink ? (
          <Image
            className="abno-94065-image"
            src={imgLink || configMini.nosearch}
            mode="widthFix"
          />
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
