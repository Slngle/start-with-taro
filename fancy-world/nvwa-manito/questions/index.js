const inquirer = require('inquirer')
const { filepath } = require('../path/configurationPath')
const { showBaseAllow, getPageList } = require('../utils')
const { flowArr } = require('./config')
const fs = require('fs')
const chalk = require('chalk')

exports.createQuestion = async () => {
  const { type } = await inquirer.prompt({
    type: 'list',
    name: 'type',
    message: 'what do you want？',
    choices: [
      {
        name: 'create component',
        value: 'component'
      },
      {
        name: 'create page',
        value: 'page'
      }
      // {
      //   name: 'processing your page',
      //   value: 'factory'
      // }
    ]
  })

  if (type === 'component') {
    // 创建组件
    const { level1 } = await inquirer.prompt([
      {
        name: 'level1',
        type: 'list',
        message: 'please choose First level folder',
        choices: filepath.componentArrow
      }
    ])
    if (level1) {
      let level = showBaseAllow({ allow: level1 })
      const { level2 } = await inquirer.prompt([
        {
          name: 'level2',
          type: 'list',
          message: 'please choose Secondary folder',
          choices: level
        }
      ])
      if (level2) {
        // level2 为组件最终插入的位置
        const { name } = await inquirer.prompt([
          {
            name: 'name',
            type: 'input',
            message: 'please input your component name（for example：test-component）'
          }
        ])
        if (name) {
          return {
            name,
            type,
            folderPath: level2
          }
        } else {
          process.exit()
        }
      }
    }
  } else if (type === 'page') {
    // 创建页面
    // level页面路径
    const { level } = await inquirer.prompt([
      {
        name: 'level',
        type: 'list',
        message: 'please choose page path',
        choices: filepath.pageArrow
      }
    ])
    if (level) {
      // flow 页面数据流
      const { flow } = await inquirer.prompt([
        {
          name: 'flow',
          type: 'list',
          message: 'please choose data flow',
          choices: flowArr
        }
      ])

      if (flow !== 'undefined') {
        const { name } = await inquirer.prompt([
          {
            name: 'name',
            type: 'input',
            message: 'please input your page name（for example：test-pages）'
          }
        ])
        const pages = await getPageList()
        if (pages[name]) {
          console.log(chalk.red(`  ${name} 页面已存在！`))
          process.exit()
          return
        }
        if (name) {
          const { title } = await inquirer.prompt([
            {
              name: 'title',
              type: 'input',
              message: 'please input your page chinese name（for example：测试页面）'
            }
          ])
          if (title) {
            return {
              type,
              title,
              name,
              flow,
              path: `/src${level.split('src')[1]}/${name}`,
              folderPath: level
            }
          } else {
            process.exit()
          }
        } else {
          process.exit()
        }
      }
    }
  } else if (type === 'factory') {
    // 加工你的页面
    const { level } = await inquirer.prompt([
      {
        name: 'level',
        type: 'list',
        message: 'please choose page path',
        choices: filepath.pageArrowProcess
      }
    ])
    if (level) {
      let choices = fs.readdirSync(level)
      const { level2 } = await inquirer.prompt([
        {
          name: 'level2',
          type: 'list',
          message: 'please choose page name',
          choices: choices.map(data => {
            return {
              name: data,
              value: `${level}/${data}`
            }
          })
        }
      ])
      if (level2) {
        // 选择好用哪个模版 加工哪个页面 就交给工厂了
        const factoryTemplate = require(filepath.factoryTemplate)
        const { templateName } = await inquirer.prompt([
          {
            name: 'templateName',
            type: 'list',
            message: 'please choose template name',
            choices: Object.keys(factoryTemplate)
          }
        ])
        if (templateName) {
          return {
            type,
            templateName: templateName,
            folderPath: level2
          }
        }
      }
    }
  }
}
