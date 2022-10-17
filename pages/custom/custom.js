// pages/custom/custom.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zpList: [],
    touchStart: 0,
    touchEnd: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getZpList()
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

  getZpList() {
    const zpList = wx.getStorageSync(app.key.zpList)
    this.setData({
      zpList: zpList || []
    })
  },

  add(e) {
    const index = e.currentTarget.dataset.index
    if (index > -1) {
      wx.navigateTo({
        url: `/pages/add/add?index=${index}`,
      })
    } else {
      wx.navigateTo({
        url: '/pages/add/add?index',
      })
    }
  },

  onEvent(e) {
    const index = e.currentTarget.dataset.index
    let that = this;
    // 触摸时间距离页面打开的毫秒数  
    let touchTime = that.data.touchEnd - that.data.touchStart;
    if (touchTime > 350) {
      this.showDel(index)
    } else {
      this.toIndex(index)
    }
  },

  toIndex(index) {
    const item = this.data.zpList[index]
    wx.setStorageSync(app.key.zpItem, item)
    const jsonItem = JSON.stringify(item)
    wx.navigateTo({
      url: `/pages/index/index?item=${jsonItem}`,
    })
  },

  showDel(index) {
    const length = this.data.zpList.length
    if (length < 2) {
      wx.showToast({
        title: '最后一个不可以删除哦~',
        icon: 'none'
      })
      return
    }
    wx.showModal({
      title: '温馨提示',
      content: '确定删除吗？',
      confirmColor: '#d46877',
      success: res => {
        if (res.confirm) {
          this.del(index)
        }
      }
    })
  },

  del(index) {
    let zpList = wx.getStorageSync(app.key.zpList)
    zpList.splice(index, 1);
    wx.setStorageSync(app.key.zpList, zpList)
    this.setData({
      zpList
    })
  },

  //按下事件开始  
  mytouchstart(e) {
    let that = this;
    that.setData({
      touchStart: e.timeStamp
    })
  },

  //按下事件结束  
  mytouchend(e) {
    let that = this;
    that.setData({
      touchEnd: e.timeStamp
    })
  },
})