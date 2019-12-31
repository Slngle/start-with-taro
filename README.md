#### 欢迎入坑

- 女神镇楼！
- ![gakki](http://imgsize.52shangou.com/img/n/12/02/1543735628832_2178.jpeg@500w_.png)

#### 温馨提示

##### js 千万条，性能第一条，代码不规范，重构两行泪

#### 开发环境

- node 10.0.0+

#### 开发使用

##### 1.taro

##### 2.redux

##### 3.redux-promise

#### 如何开始

##### 0. 若有问题 先 rm -rf ~/.node-gyp 再 sudo npm cache clean --force

##### 0. 若报错 node-gyp rebuild error 尝试把/usr/local/include 里面所有文件移到其他地方去

##### 0 rn 问题

##### 第三方模块报错 third-party

##### 1. [下载小程序开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html?t=18102216)

##### 2. npm install -g @tarojs/cli@1.3.29

##### 3. npm install

##### 4. npm run dev:(weapp or h5 or rn)

##### 5. npm run build:(weapp or h5 or rn)

##### 6.小程序开发者工具创建个项目 appid 为 wx8da6ebed6679a61e ，目录为 dist，没有开发者权限请找承山

#### 页面模版 组件模版 分包页面模版 自动创建

##### 1.template 文件夹里面放的是创建模版的文件

##### 2.安装：先把 package.json 里面 dependencies devdependencies 删掉 然后运行 npm install -g（目前没有把这个做成一个工具所以要这样搞）

##### 2.运行 createmini 可自由选择创建页面或者组件

##### 3.其中要注意的是页面分为分包页面以及普通页面 分包页面异步加载 store 和页面代码 （页面创建完后会自动写到 pagejumplist 里面供后期跳转用）

##### 4.页面和组件的名称为 xxx-xxx 会自动帮你搞成大驼峰

##### 5.如果 reducers/index.js；有冲突 直接 createmini --updatestore 可以更新（会自动读取文件）

#### 分平台打包

##### 1. cd ./template/freecreate && cnpm install

##### 2. createmini -p 会出个 web 页面

##### 3. 点 build （目前仅仅打包到线上 其余配置还在开发中）

##### 4. 动态设置 config 配置 process.env.对应的 key

`"env": { "BASE_NAV_TITLETEXT": "闪电购便利店", "BASE_BG_BGCOLOR": "#000000", "BASE_BG_TEXTSTYLE": "dark", "BASE_NAV_BGCOLOR": "#ffffff", "BASE_NAV_TEXTSTYLE": "black", "SPE_BG_BGCOLOR": "#000000", "SPE_BG_TEXTSTYLE": "dark", "SPE_NAV_BGCOLOR": "#00C2C7", "SPE_NAV_TEXTSTYLE": "white" }`

#### 页面结构

```
startedwithtaroredux
├─ .editorconfig //编辑器config
├─ .eslintrc //eslint
├─ .gitignore
├─ README.md
├─ config //webpack.config.js
│    ├─ dev.js
│    ├─ index.js
│    └─ prod.js
├─ dist //weapp的编译后目录
├─ .temp //h5的编译后目录
├─ package.json
├─ src
│    ├─ app.js //入口文件
│    ├─ app.less //入口文件的less 只作用于pages一级的
│    ├─ index.html //入口html
│    ├─ components //组件
│    │    ├─ HOC //存放高阶
│    │    ├─ page-components //存放普通通用组件
│    │    └─ taro-ui //存放规定通用组件 如toast actionsheet modal等等
│    ├─ configuration
│    │    ├─ globaldata.js //globaldata 里面放配置信息 如host sessionkey 等等
│    │    ├─ theme.js //放ka配置的图片
│    │    └─ theme.less //放ka配置样式
│    ├─ crossplatform //为了api和component的跨平台
│    │    ├─ apiservice //将taro api进行一次封装
│    │    └─ componentsservice //将不通用的组件进行一次封装
│    ├─ pages //页面文件
│    │    └─ home-page //页面文件
│    │         ├─ store //存放store
│    │         │    ├─ actions
│    │         │    ├─ reducers
│    │         │    └─ types
│    │         ├─ components //存放页面自己的组件
│    │         ├─ index.js //入口js
│    │         └─ index.less //入口css
│    ├─ service //网络
│    │    ├─ API //分装了请求函数
│    │    └─ user.js //请求的业务线 暴露请求api方法
│    ├─ static //静态资源
│    │    ├─ css
│    │    └─ images
│    ├─ store //外层store
│    │    ├─ actions
│    │    ├─ reducers
│    │    ├─ types
│    │    ├─ index.js //暴露store的方法
│    │    ├─ reducerUtils.js//异步加载reducer的方法
│    │    └─setstore.js //创建store的方法
│    └─ subpackages
│           └─ pages
│              └─ test-page //页面文件
│                   ├─ store //存放store
│                   │    ├─ actions
│                   │    ├─ reducers
│                   │    └─ types
│                   ├─ components //存放页面自己的组件
│                   ├─ index.js //入口js
│                   └─ index.less //入口css
└─ template
       ├─ component-template.js
       ├─ config.js
       ├─ create.js
       ├─ index.js
       ├─ page-template.js
       └─ template.js
```

#### 字段规范

##### 一.商品列表类别

```
goodssingle:{
  itemId:'',
  imageLink:'',
  itemHotIcon:'',
  itemName:'',
  price:'',
  promotionPrice:'',
  memberPrice:'',
  itemDesc:'',
  property:'',
  unit:''
}
```

#### 各种教程

##### 1.资源整合：https://github.com/NervJS/awesome-taro

#### tips

##### 不要短时间内发起太多的图片请求：短时间内发起太多图片请求会触发浏览器并行加载的限制，可能导致图片加载慢，用户一直处理等待。应该合理控制数量，可考虑使用雪碧图技术或在屏幕外的图片使用懒加载

##### 避免短时间内发起太多的请求：短时间内发起太多请求会触发小程序并行请求数量的限制，同时太多请求也可能导致加载慢等问题，应合理控制请求数量，甚至做请求的合并等

##### 避免 setData 的数据过大：由于小程序运行逻辑线程与渲染线程之上，setData 的调用会把数据从逻辑层传到渲染层，数据太大会增加通信时间

##### 避免 setData 的调用过于频繁：setData 接口的调用涉及逻辑层与渲染层间的线程通过，通信过于频繁可能导致处理队列阻塞，界面渲染不及时而导致卡顿，应避免无用的频繁调用

##### 避免将未绑定在 WXML 的变量传入 setData：setData 操作会引起框架处理一些渲染界面相关的工作，一个未绑定的变量意味着与界面渲染无关，传入 setData 会造成不必要的性能消耗

##### 避免过大的 WXML 节点数目：建议一个页面使用少于 1000 个 WXML 节点，节点树深度少于 30 层，子节点数不大于 60 个。一个太大的 WXML 节点树会增加内存的使用，样式重排时间也会更长。

##### 滚动区域可开启惯性滚动以增强体验：惯性滚动会使滚动比较顺畅，在安卓下默认有惯性滚动，而在 iOS 下需要额外设置 `-webkit-overflow-scrolling: touch` 的样式

##### 避免将不可能被访问到的页面打包在小程序包里：小程序的包大小会影响加载时间，应该尽量控制包体积大小，避免将不会被使用的文件打包进去

##### 避免定时器未跟随页面回收：定时器是全局的，并不是跟页面绑定的，当页面因后退被销毁时，定时器应注意手动回收

##### 避免使用 css ':active' 伪类来实现点击态：使用 css ':active' 伪类来实现点击态，很容易触发，并且滚动或滑动时点击态不会消失，体验较差。建议使用小程序内置组件的 'hover-\*'

##### 无尽列表 可以采用[[10 个值],[10 个值],[10 个值],[10 个值]]这种形式提高性能

##### h5 上面 window.onscroll 滚不动 element 为.taro-tabbar\_\_panel 才滚得动

#### 开发注意！！！

##### 1.所有 taro 的 api 请不要直接使用，到 crosslpatform 里去寻找，有一一对应，没有的话你创建一个一一对应的。（原因：可以在里面处理 api 的跨平台问题）

##### 2.调用定时器的页面请在 onHide 和 onUnload 的时候将定时器关了 onLoad 或 onShow 的时候再开启 不然会一直 setdata

##### 3.如果 reducers/index.js；有冲突 直接 createmini --updatestore(us) 可以更新（会自动读取文件）

##### 4.页面跳转请到 configuration/pagejumplist.json;找到页面的 key 不要直接写路径跳转

##### 5.小程序基础库 2.3.0 以上(为了支持分包预加载)

##### 6.border，background-Image rn 不支持 所以最好别写

##### 7.样式采用 bem 的写法 不要嵌套写

#### 微信公众号开发注意点

##### 自己下载个 nginx

##### 修改 nginx.conf

```
server {
  listen       80;
  server_name  h5.m.52shangou.com;
  location /{
    proxy_pass http://dev.52shangou.com:1234;
  }
}
```

##### 启动 nginx

#### RN 方面注意点

##### 1.必须采用 Flex 布局，并且样式选择器仅支持类选择器，且不支持 组合器;不支持伪类

##### 2.文字请用<Text></Text>标签包住

##### 3.box-shadow 有问题

#### changelogs

##### 去除首页的消息机制（首页 onUnload 难以触发）

##### 二级页使用消息机制 监听 shopId 变化 （onLoad 的时候注册 onUnload 的时候移除）

#### 重构测试要点

##### 1.分享逻辑

##### 2.会员价

##### 3.登录流程（新老用户）

##### 4.授权流程（保存相册等等）
