exports.pageIndex = ({ name, cssname }) => {
  return `import React, { Component } from 'react'
import './index.less'
export default class ${name} extends Component {
  render() {
    return <div className="${cssname}">hello world!</div>
  }
}`
}

exports.pageCss = ({ cssname }) => {
  return `.${cssname} {
}`
}
