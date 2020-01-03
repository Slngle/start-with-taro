//base
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
//less
import './index.less'
import networkErrorImg from '../../../static/images/networkError.png'

class NetworkError extends Component {
  static defaultProps = {
    visible: false
  }

  render() {
    const { visible } = this.props

    return (
      <View className={`NetworkError_id65004 ${visible ? '' : 'hide'}`}>
        <View className="networkerrorwrap">
          <Image className="error-dog" src={networkErrorImg} />
          <View className="content">
            <Text className="content-text">呀，网络出了问题</Text>
          </View>
          <View className="reconnect" onClick={this.props.onReload}>
            <Text className="reconnect-text">重新加载</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default NetworkError
