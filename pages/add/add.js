const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    conLists: [],
    index: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const index = options.index
    this.getData(index)
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
   * 添加内容
   */
  add(e) {
    // 点击添加按钮，就往数组里添加一条空数据
    var _list = this.data.conLists;
    _list.push("")
    this.setData({
      conLists: _list
    })
  },

  /**
   * 删除内容
   */
  del(e) {
    var idx = e.currentTarget.dataset.index;
    var _list = this.data.conLists;
    console.log(idx)
    for (let i = 0; i < _list.length; i++) {
      if (idx == i) {
        _list.splice(idx, 1)
      }
    }
    this.setData({
      conLists: _list
    })
  },

  /**
   * 获取输入的内容标题
   */
  changeConTitle(e) {
    var idx = e.currentTarget.dataset.index; //当前下标
    var val = e.detail.value; //当前输入的值
    var _list = this.data.conLists; //data中存放的数据

    for (let i = 0; i < _list.length; i++) {
      if (idx == i) {
        _list[i] = val //将当前输入的值放到数组中对应的位置
      }
    }
    this.setData({
      conLists: _list
    })
  },

  /**
   * 完成
   */
  submit() {
    var title = this.data.title;
    if (!title) {
      wx.showToast({
        title: '请填写标题~',
        icon: 'none'
      })
      return;
    }
    var _conLists = this.data.conLists;
    if (_conLists.length < 2) {
      wx.showToast({
        title: '至少写两个哦~',
        icon: 'none'
      })
      return;
    }
    for (let i = 0; i < _conLists.length; i++) {
      if (!_conLists[i]) {
        wx.showToast({
          title: '请输入第' + `${i + 1}` + '条的内容~',
          icon: 'none'
        })
        return;
      } else {
        if (_conLists[i].length > 10) {
          wx.showToast({
            title: '第' + `${i + 1}` + '条最多10个字哦~',
            icon: 'none'
          })
          return;
        }
      }
    }
    // 放入本地
    let zpList = wx.getStorageSync(app.key.zpList)
    if (zpList.length < 1) {
      zpList = []
      zpList.unshift({
        key: this.data.title,
        value: _conLists
      })
    } else {
      const index = this.data.index
      if (index > -1) {
        zpList[index] = {
          key: this.data.title,
          value: _conLists
        }
      } else {
        zpList.unshift({
          key: this.data.title,
          value: _conLists
        })
      }
    }
    wx.setStorageSync(app.key.zpList, zpList)
    wx.setStorageSync(app.key.zpItem, zpList[0])
    // 跳转
    const jsonItem = JSON.stringify(zpList[0])
    wx.navigateTo({
      url: `/pages/index/index?item=${jsonItem}`,
    })
  },

  getData(index) {
    const contentList = wx.getStorageSync(app.key.zpList)
    if (contentList[index]) {
      this.setData({
        title: contentList[index].key,
        conLists: contentList[index].value,
        index
      })
    }
  }
})