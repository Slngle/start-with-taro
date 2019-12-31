#! /usr/bin/env node
const program = require('commander')
const { createQuestion } = require('./questions')
const { createComponent } = require('./create/components')
const { createPage } = require('./create/pages')

program.option('-t, --template', 'create template')
program.parse(process.argv)
if (program.template) {
  createQuestion().then(async data => {
    if (data.type === 'component') {
      // 组件为 {name:'test-component',type:'component',folderPath:'创建的路径地址'}
      await createComponent(data)
    } else if (data.type === 'page') {
      // page为 {name:'test-pages',type:'page',flow:'数据流',path:'相对于src的path',folderPath:'创建的路径地址'}
      await createPage(data)
    }
  })
}
