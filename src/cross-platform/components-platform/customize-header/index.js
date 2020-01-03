//base
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
//less
import './index.less'
import gobackPng from '../../../static/images/goback.png'
import { navigateBack } from '../../api-platform/router'
import { getSystemInfoSync } from '../../api-platform/equipment/system-info'
import { configUi } from '../../../global-data'

const NAVIGATORTITLE_HEIGHT = configUi.NAVIGATORTITLE_HEIGHT
const { windowWidth, statusBarHeight } = getSystemInfoSync()
const statusBarHeightIn750 = (statusBarHeight * 750) / windowWidth

class NavigationBar extends Component {
  static defaultProps = {
    goBack: false,
    navigationBarColor: '#ffffff',
    color: '#232323',
    navigationBarTitle: '',
    line: true,
    tspBar: false // 透明头
  }

  state = {}

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextprops) {}

  componentWillUnmount() {}

  onNavigationBack = () => {
    const { goback } = this.props
    if (goback) {
      navigateBack()
      this.props.onNavigateBack && this.props.onNavigateBack()
    }
  }

  render() {
    const { goback, navigationBarTitle, navigationBarColor, line, tspBar, color } = this.props
    const styleWrap = {}

    if (!tspBar) {
      if (navigationBarColor) {
        styleWrap['backgroundColor'] = navigationBarColor
      } else {
        styleWrap['backgroundColor'] = '#ffffff'
      }
    } else {
      styleWrap['position'] = 'absolute'
      styleWrap['left'] = 0
      styleWrap['top'] = 0
      styleWrap['zIndex'] = 1
    }
    if (navigationBarTitle && line) {
      if (process.env.TARO_ENV === 'rn') {
        styleWrap['borderBottomWidth'] = 1
        styleWrap['borderStyle'] = 'solid'
        styleWrap['borderBottomColor'] = '#EDEDED'
      } else {
        styleWrap['borderBottom'] = '1px solid #EDEDED'
      }
    }

    return (
      <View
        className="header-8273"
        style={{ paddingTop: Taro.pxTransform(statusBarHeightIn750), ...styleWrap }}
      >
        {navigationBarTitle ? (
          <View
            className="header-8273-wrap"
            style={{ height: Taro.pxTransform(NAVIGATORTITLE_HEIGHT) }}
          >
            <View className="header-8273-wrap-left" onClick={this.onNavigationBack}>
              {goback ? <Image className="header-8273-wrap-left-image" src={gobackPng} /> : null}
            </View>
            <View className="header-8273-wrap-middle">
              <Text className="header-8273-wrap-middle-text" style={{ color: color }}>
                {navigationBarTitle != 'true' ? navigationBarTitle : ''}
              </Text>
            </View>
            <View className="header-8273-wrap-right">{this.props.renderExtra}</View>
          </View>
        ) : null}
      </View>
    )
  }
}

export default NavigationBar
