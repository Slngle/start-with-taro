import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { UPDATEPAGEHOMEPAGEREQ, UPDATEPAGEHOMEPAGEPAGINGREQ } from './store/actions/PageHomePage'
import { UPDATEPAGEHOMEPAGE, CLEARPAGEHOMEPAGE } from './store/types/PageHomePage'
import './index.less'
import { showLoading, hideLoading } from '../../cross-platform/api-platform/viewport/interaction'
import { getWindowHeight } from '../../cross-platform/api-platform/equipment/system-info'
import NetworkError from '../../components/base-ui/network-error'
import AbnormalFlow from '../../components/base-ui/abnormal-flow'
import NavigationBar from '../../cross-platform/components-platform/customize-header'

let timer = null

const mapActiontoProps = dispatch => ({
  updateState(payload) {
    dispatch({
      type: UPDATEPAGEHOMEPAGE,
      payload: {
        ...payload
      }
    })
  },
  clearState() {
    dispatch({
      type: CLEARPAGEHOMEPAGE
    })
  },
  dorequest(payload) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      showLoading({
        title: '玩命加载中'
      })
    }, 2000)
    return new Promise(resolve => {
      let promise = UPDATEPAGEHOMEPAGEREQ(payload)
      dispatch(promise)
      promise.payload.then(data => {
        clearTimeout(timer)
        timer = null
        hideLoading()
        resolve(data)
      })
    })
  },
  queryPaging(payload) {
    let promise = UPDATEPAGEHOMEPAGEPAGINGREQ(payload)
    dispatch(promise)
    return promise.payload.then
  }
})

@connect(
  ({ PageHomePage }) => ({
    ...PageHomePage
  }),
  mapActiontoProps
)
export default class HomePage extends Component {
  static defaultProps = {
    dataSource: []
  }

  inRequest = false

  config = {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
    disableScroll: true
  }

  componentWillMount() {
    if (process.env.TARO_ENV === 'h5') {
      document.title = '首页'
    }
    this.queryWrap()
  }

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentWillUnmount() {
    this.props.clearState()
  }

  queryWrap = () => {
    this.props.dorequest()
  }

  onReload = () => {
    this.queryWrap()
  }

  onScrollToLower = () => {
    const { hasNextPage, pageSize, pageNum } = this.props
    if (!this.inRequest && hasNextPage) {
      this.inRequest = true
      this.props.queryPaging({ pageSize, pageNum: pageNum + 1 }).then(() => {
        this.inRequest = false
      })
    }
  }

  render() {
    const { dataSource, showEmpty } = this.props
    const style = {
      height: getWindowHeight(false, true)
    }

    return (
      <div className="Home-1658">
        <NavigationBar navigationBarTitle="首页" goback />
        <NetworkError visible={this.props.networkError} onReload={this.onReload}></NetworkError>
        {!this.props.networkError ? (
          <View className="Home-1658-wrap" style={style}>
            {showEmpty ? (
              <AbnormalFlow text="none" />
            ) : (
              <ScrollView style={style} scrollY onScrollToLower={this.onScrollToLower}>
                hello world!
              </ScrollView>
            )}
          </View>
        ) : null}
      </div>
    )
  }
}
