import * as api from '../../api/index'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    zpId: null,
    awards: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.zpId) {
      const zpId = Number(options.zpId)
      this.getData(zpId)
    }
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


  /**
   * 获取数据
   * @param {Number} zpId 
   */
  getData(zpId) {
    const zpItem = api.getZpItem(zpId)
    if (zpItem) {
      this.setData({
        title: zpItem.title,
        zpId,
        awards: zpItem.awards
      })
    }
  },


  /**
   * 添加内容
   */
  add() {
    // 点击添加按钮，就往数组里添加一条空数据
    const awards = this.data.awards;
    awards.push({
      awardId: awards.length + 1,
      name: "",
      color: "",
      probability: 10
    })
    this.setData({
      awards
    })
  },

  /**
   * 删除内容
   */
  del(e) {
    const index = e.currentTarget.dataset.index;
    const awards = this.data.awards;
    awards.splice(index, 1)
    this.setData({
      awards
    })
  },

  /**
   * 获取输入的内容标题
   */
  changeInput(e) {
    const index = e.currentTarget.dataset.index; //当前下标
    const val = e.detail.value; //当前输入的值
    const awards = this.data.awards; //data中存放的数据
    awards[index].name = val //将当前输入的值放到数组中对应的位置
    this.setData({
      awards
    })
  },

  /**
   * 完成
   */
  submit() {
    const title = this.data.title;
    if (!title) {
      wx.showToast({
        title: '请填写标题~',
        icon: 'none'
      })
      return;
    }
    const awards = this.data.awards;
    if (awards.length < 2) {
      wx.showToast({
        title: '至少写两个哦~',
        icon: 'none'
      })
      return;
    }
    const colors = app.globalData.colors;
    for (let i = 0; i < awards.length; i++) {
      if (!awards[i]) {
        wx.showToast({
          title: '请输入第' + `${i + 1}` + '条的内容~',
          icon: 'none'
        })
        return;
      } else {
        if (awards[i].length > 10) {
          wx.showToast({
            title: '第' + `${i + 1}` + '条最多10个字哦~',
            icon: 'none'
          })
          return;
        }
      }
      const color = colors.shift()
      colors.push(color)
      awards[i].color = color
    }
    const zpId = this.data.zpId
    // 放入本地
    const zpItem = api.postZpItem({
      zpId,
      awards,
      title,
    })
    // 跳转
    wx.navigateTo({
      url: `/pages/index/index?zpId=${zpItem.zpId}`,
    })
  },

})