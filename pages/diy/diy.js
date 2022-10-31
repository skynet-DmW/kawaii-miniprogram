import * as api from '../../api/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    zpList: [],
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
    const zpList = api.getZpList()
    this.setData({
      zpList
    })
  },

  add(e) {
    const zpId = e.currentTarget.dataset.zpId
    wx.navigateTo({
      url: `/pages/add/add?zpId=${zpId}`,
    })
  },

  toIndex(e) {
    const zpId = e.currentTarget.dataset.zpId
    wx.navigateTo({
      url: `/pages/index/index?zpId=${zpId}`,
    })
  },

  showDel(zpId) {
    const length = this.data.zpList.length
    if (length < 2) {
      // wx.showToast({
      //   title: '最后一个不可以删除哦~',
      //   icon: 'none'
      // })
      return
    }
    wx.showModal({
      title: '温馨提示',
      content: '确定删除吗？',
      confirmColor: '#d46877',
      success: res => {
        if (res.confirm) {
          this.del(zpId)
        }
      }
    })
  },

  del(zpId) {
    api.delZpItem(zpId)
    this.getZpList()
  },

  // 手指触摸后，超过350ms再离开，如果指定了事件回调函数并触发了这个事件，tap事件将不被触发
  onLongPress(e) {
    const zpId = e.currentTarget.dataset.zpId
    this.showDel(zpId)
  },

})