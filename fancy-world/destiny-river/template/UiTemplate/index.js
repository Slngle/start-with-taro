exports.getUiMessage = async function(ui) {
  const list = [
    {
      id: 1,
      name: '基础蓝色主题',
      configImg: {
        shareimg: 'http://imgsize.52shangou.com/img/n/05/08/1525759843512_1523.jpeg',
        sharetitle: '双十一劲爆降价！！！',
        nogwc: 'http://imgsize.52shangou.com/img/n/04/20/1524158894460_5461.png',
        nosearch: 'http://imgsize.52shangou.com/img/n/04/20/1524158897096_1694.png',
        noorder: 'http://imgsize.52shangou.com/img/n/04/20/1524158896396_7040.png',
        nocoupon: 'http://imgsize.52shangou.com/img/n/04/20/1524158895651_7034.png',
        placeholder: 'http://imgsize.52shangou.com/img/n/11/08/1541660346096_6861.png',
        whitebar: 'http://imgsize.52shangou.com/img/n/12/12/1544599299280_8065.png'
      },
      configCss: {
        primarySub: 'rgba(0,194,199,.1)',
        primary: '#00C2C7',
        primarytext: '#FFFFFF',
        linechange: 'linear-gradient(to bottom, #00C3C7, #86DFB9)',
        linechangecross: 'linear-gradient(to right, #00C3C7, #86DFB9)',
        button: 'linear-gradient(to right, #FF8662, #FF5B5B)',
        buttontext: '#FFFFFF',
        price: '#c5c5c5',
        promotionPrice: '#FF505F',
        memberprice: '#C49A59',
        disabledcolor: '#f7f7f7',
        homepagebg: '#FFFFFF',
        homepageimgfloat: 'rgba(255, 255, 255, 0)',
        memberlineargradient: 'linear-gradient(right bottom, #C49A59, #DEBC87)',
        memberlineargradienttext: '#FFFFFF',
        memberlineargradientbackground: 'linear-gradient(to bottom, #FFF7EA, #FFEFD6)',
        memberlineargradientbackgroundtext: '#A87F3E'
      }
    }
  ]
  let single = {}
  if (ui) {
    list.forEach(data => {
      if (data.id == ui) {
        single = data
      }
    })
  } else {
    single = list[0]
  }
  let configJson = single
  let configImg = ''
  let configCss = ''
  Object.keys(single.configImg || {}).forEach(attr => {
    configImg += `${attr}: '${single.configImg[attr]}',\r\n`
  })
  Object.keys(single.configCss || {}).forEach(attr => {
    configCss += `${attr}: '${single.configCss[attr]}',\r\n`
  })
  let configMini = `export const configMini = {
  ${configImg}
  ${configCss}
}`

  let configLess = ``
  Object.keys(single.configCss || {}).forEach(attr => {
    configLess += `@${attr}: ${single.configCss[attr]};\r\n`
  })
  return {
    configMini,
    configLess,
    configJson
  }
}
