import Observer from './utils/observer'
// import { Observer } from './utils/observer'

App({
  onLaunch() {
    this.getUpdateManager()
    this.init()
  },

  globalData: {
    zpList: [],
    zpItem: {},
    musicFlag: true, // 音乐开关
  },

  // 初始化
  init() {
    const globalData = wx.getStorageSync('globalData') || {}
    this.globalData = Object.keys(globalData).length === Object.keys(this.globalData).length ? globalData : this.globalData
    new Observer(this.globalData, (newVal, oldVal, [name]) => {
      !Object.is(newVal, oldVal) && wx.setStorageSync('globalData', {
        ...this.globalData,
        [name]: newVal
      })
    })
  },

  // 新版本更新提示
  getUpdateManager() {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        // console.log('onCheckForUpdate====', res)
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          console.log('res.hasUpdate====')
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success(res) {
                // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            })
          })
        }
      })
    }
  }
})
