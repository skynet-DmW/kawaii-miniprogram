const app = getApp()
import * as api from '../../api/index'

Page({
  data: {
    zhuanpan: null,
    size: 600,// 转盘大小,
    musicFlag: true, // 声音
    quickStart: false,// 快速决定
    repeat: false,// 不重复抽取
    probability: false,// 概率
    s_awards: '',// 结果
    option: '标题',
    // 更改数据可以更改这属性，格式要像下面这样写才行
    lottery: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 实例化组件对象，这样有需要时就能调用组件内的方法
    // 可以这样调用 示例：this.zhuanpan.switchZhuanpan(data); 
    // 上面这方法可用来切换转盘选项数据，参数可以看组件构造器中的switchZhuanpan方法
    this.zhuanpan = this.selectComponent("#zhuanpan");

    this.getData()
    this.getConfig()
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 接收当前转盘结束后的答案选项
  getAwards(e) {
    wx.showToast({
      title: e.detail,
      icon: 'none'
    })
    this.setData({
      s_awards: e.detail,
    })
  },

  // 开始转动或者结束转动
  startLucky(e) {
    this.setData({
      startFlag: e.detail ? true : false
    })
  },

  // 转盘声音
  musicChange(e) {
    var value = e.detail.value;
    if (this.data.startFlag) {
      wx.showToast({
        title: '下一次转盘生效哦~',
        icon: 'none'
      })
    }
    this.setData({
      musicFlag: value
    })
    wx.setStorageSync(app.key.music, value)
  },

  // 不重复抽取
  repeatChange(e) {
    var value = e.detail.value;
    if (this.data.startFlag) {
      wx.showToast({
        title: '当转盘停止转动后才有效',
        icon: 'none'
      })
      return;
    } else {
      this.setData({
        repeat: value
      })
    }
  },

  // 快速决定
  quickStartChange(e) {
    var value = e.detail.value;
    if (this.data.startFlag) {
      wx.showToast({
        title: '当转盘停止转动后才有效',
        icon: 'none'
      })
      return;
    } else {
      this.setData({
        quickStart: value
      })
    }
  },

  // 概率 == 如果不重复抽取开启的话 概率是无效的
  probabilityChange(e) {
    var value = e.detail.value;
    if (this.data.startFlag) {
      wx.showToast({
        title: '当转盘停止转动后才有效',
        icon: 'none'
      })
      return;
    } else {
      this.setData({
        probability: value
      })
    }
  },

  toAdd() {
    wx.navigateTo({
      url: '/pages/add/add',
    })
  },

  toDiy() {
    wx.navigateTo({
      url: '/pages/diy/diy',
    })
  },

  getData() {
    const lottery = api.getZpItem()
    this.setData({
      lottery
    })
  },

  getConfig() {
    const musicFlag = api.getMusicFlag()
    this.setData({
      musicFlag: musicFlag
    })
  }
})