exports.pageGlobal = ({ name }) => {
  return `let pageGlobalData = {
}

export function set${name}Global(key, val) {
  pageGlobalData[key] = val
}

export function get${name}Global(key) {
  if (key) {
    return pageGlobalData[key]
  } else {
    return pageGlobalData
  }
}`
}
