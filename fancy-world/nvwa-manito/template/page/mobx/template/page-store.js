exports.pageStoreRoot = ({ name }) => {
  return `import ${name} from './${name}'
  
export default {
  ${name}: new ${name}()
}`
}

exports.pageStoreIndex = ({ name }) => {
  return `import { observable, action } from 'mobx'

export default class ${name} {
  @observable loading = false
  @observable dataSource = []

  constructor() {
    // ...
  }

  @action async render(data) {}
}`
}
