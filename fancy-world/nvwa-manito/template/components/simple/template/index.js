exports.componet = ({ name, cssname }) => {
  if (process.env.FRAMEWORK === 'web') {
    return componetH5({ name, cssname })
  } else if (process.env.FRAMEWORK === 'taro') {
    return componetTaro({ name, cssname })
  }
}

exports.compontCss = ({ cssname }) => {
  if (process.env.FRAMEWORK === 'web') {
    return compontCssH5({ cssname })
  } else if (process.env.FRAMEWORK === 'taro') {
    return compontCssTaro({ cssname })
  }
}

const componetH5 = ({ name, cssname }) => {
  return `import React, { Component } from 'react'
import './index.less'
export default class ${name} extends Component {
  render() {
    return <div className="${cssname}">hello world!</div>
  }
}`
}

const compontCssH5 = ({ cssname }) => {
  return `.${cssname} {
}`
}

const componetTaro = ({ name, cssname }) => {
  return `import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'

export default class ${name} extends Component {
  render() {
    return (
      <View className="${cssname}">
        <Text>hello world!</Text>
      </View>
    )
  }
}`
}

const compontCssTaro = ({ cssname }) => {
  return `.${cssname} {
}`
}
