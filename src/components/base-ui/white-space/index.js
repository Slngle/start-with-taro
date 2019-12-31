//base
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
//less
import './index.less'
//component

class WhiteSpace extends Component {
  static defaultProps = {}

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentWillReceiveProps(nextprops) {}

  render() {
    return (
      <View className="whit-9285">
        <View className="whit-9285-linespit"></View>
      </View>
    )
  }
}

export default WhiteSpace
