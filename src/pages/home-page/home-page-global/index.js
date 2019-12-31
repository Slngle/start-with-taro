let pageGlobalData = {}

export function setHomePageGlobal(key, val) {
  pageGlobalData[key] = val
}

export function getHomePageGlobal(key) {
  if (key) {
    return pageGlobalData[key]
  } else {
    return pageGlobalData
  }
}
