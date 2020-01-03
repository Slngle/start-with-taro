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

  componentWillReceiveProps(nextprops) {}

  componentWillUnmount() {}

  render() {
    return (
      <View className="whit-9285">
        <View className="whit-9285-linespit" />
      </View>
    )
  }
}

export default WhiteSpace
