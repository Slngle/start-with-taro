exports.getEntryTemplate = function({ flow, name }) {
  let template = `import React from 'react'
import ReactDOM from 'react-dom'
${
  flow == 'mobx'
    ? "import { Provider } from 'mobx-react'"
    : flow == 'redux'
    ? "import { Provider } from 'react-redux'"
    : ''
}
${flow ? `import store from '../../pages/${name}/store/root'` : ''}
import App from '../../pages/${name}/index'
import '../../static/css/index.less'

ReactDOM.render(${
    flow ? '<Provider {...store}><App/></Provider>' : '<App/>'
  }, document.getElementById('root'))

if (module.hot) {
  module.hot.accept()
}`
  return template
}
