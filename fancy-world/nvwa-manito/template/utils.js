const getTName = name => {
  if (!name) {
    return ''
  }
  const nameArr = name.split('-')
  let returnName = ''
  nameArr.forEach(data => {
    returnName += data[0].toUpperCase() + data.slice(1)
  })
  return returnName
}

const getRandom = () => {
  let arr = [1, 2, 3, 4]
  let random = ''
  arr.forEach(() => {
    random += Math.floor(Math.random() * 10)
  })
  return '-' + random
}

const getUni = name => {
  if (!name) {
    return ''
  }
  return name.slice(0, 4) + getRandom()
}

exports.getFormatName = ({ name }) => {
  const normalName = name.toLowerCase() // test-page 所有都先小写
  const tName = getTName(normalName) // TestPage 驼峰名称
  const pageTName = 'Page' + tName // 前面加个'page'标志page维度 （如 mobx的类名称 PageTestPage）
  const cssUniName = getUni(tName) // css的名称 采用 `${page名称的前四个字母}-${4位随机数}`
  const pageTypesName = pageTName.toUpperCase() // 所有全部大写 PAGETESTPAGE

  return {
    normalName,
    tName,
    pageTName,
    cssUniName
  }
}
