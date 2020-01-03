exports.getKaMessage = async function(orgId) {
  const list = [
    {
      projectname: '闪电购线上',
      kaName: '闪电购文具店',
      organizeId: 70,
      kaId: 15,
      appid: 'wx8da6ebed6679a61e',
      configText: {
        tagslist: ['海外直采', '正品保障', '高性价比', '最快30分达'],
        coinname: '鲸币',
        indistribution: {
          express: '快递物流',
          selffetch: '门店自提',
          sendtohome1: '最快半小时达',
          sendtohome2: '最快半小时达'
        }
      }
    }
  ]
  let single = {}
  if (orgId) {
    list.forEach(data => {
      if (data.organizeId == orgId) {
        single = data
      }
    })
  } else {
    single = list[0]
  }
  return single
}
