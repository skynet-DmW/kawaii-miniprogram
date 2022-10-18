const app = getApp()

Page({
  data: {
    size: 600,//转盘大小,
    musicflg: true, //声音
    fastJuedin: false,//快速决定
    repeat: false,//不重复抽取
    probability: false,// 概率
    s_awards: '',//结果
    option: '标题',
    //转盘的总数据，想添加多个可以往这数组里添加一条格式一样的数据
    zhuanpanArr: [
      {
        id: 0,
        option: '今天吃什么？',//转盘的标题名称
        awards: [
          {
            id: 0,                // id递增
            name: "麻辣香锅",           // 选项名 超过9个字时字体会变小点 大于13个数时会隐藏掉超出的
            color: '#FFA827',    // 选项的背景颜色
            probability: 0       // 概率 0代表永远也转不到这个选项，数字越大概率也就越大,data中的probability属性设置为true时是才生效, 这属性也必须填写，不填写会出错
          },
          {
            id: 1,
            name: "麻辣烫",
            color: '#AA47BC',
            probability: 10
          },
          {
            id: 2,
            name: "火锅",
            color: '#42A5F6',
            probability: 10
          },
          {
            id: 3,
            name: "串串香",
            color: '#66BB6A',
            probability: 10
          },
          {
            id: 4,
            name: "小龙虾",
            color: '#FFA500',
            probability: 100
          },
          {
            id: 5,
            name: "锅包肉",
            color: '#FF4600',
            probability: 300
          }
        ]
      }
    ],
    //更改数据可以更改这属性，格式要像下面这样写才行
    awardsConfig: {
      option: '今天吃什么？',//转盘的标题名称
      awards: [
        {
          id: 0,                // id递增
          name: "麻辣香锅",           // 选项名 超过9个字时字体会变小点 大于13个数时会隐藏掉超出的
          color: '#FFA827',    // 选项的背景颜色
          probability: 0       // 概率 0代表永远也转不到这个选项，数字越大概率也就越大,data中的probability属性设置为true时是才生效, 这属性也必须填写，不填写会出错
        },
        {
          id: 1,
          name: "麻辣烫",
          color: '#AA47BC',
          probability: 10
        },
        {
          id: 2,
          name: "火锅",
          color: '#42A5F6',
          probability: 10
        },
        {
          id: 3,
          name: "串串香",
          color: '#66BB6A',
          probability: 10
        },
        {
          id: 4,
          name: "小龙虾",
          color: '#FFA500',
          probability: 100
        },
        {
          id: 5,
          name: "锅包肉",
          color: '#FF4600',
          probability: 300
        }
      ]
    }
  },

  //接收当前转盘初始化时传来的参数
  getData(e) {
    this.setData({
      option: e.detail.option
    })
  },

  //接收当前转盘结束后的答案选项
  getAwards(e) {
    wx.showToast({
      title: e.detail,
      icon: 'none'
    })
    this.setData({
      s_awards: e.detail,
    })
  },

  //开始转动或者结束转动
  startZhuan(e) {
    this.setData({
      zhuanflg: e.detail ? true : false
    })
  },

  //切换转盘选项
  switchZhuanpan(e) {
    //当转盘停止时才执行切换转盘
    if (!this.data.zhuanflg) {
      var idx = e.currentTarget.dataset.idx, zhuanpanArr = this.data.zhuanpanArr, obj = {};
      for (let i in zhuanpanArr) {
        if (this.data.option != zhuanpanArr[i].option && zhuanpanArr[i].id == idx) {
          obj.option = zhuanpanArr[i].option;
          obj.awards = zhuanpanArr[i].awards;
          this.setData({
            awardsConfig: obj //其实默认要更改当前转盘的数据要传个这个对象，才有效果
          })
          break;
        }
      }
    }
  },

  //转盘声音
  musicChange(e) {
    var value = e.detail.value;
    if (this.data.zhuanflg) {
      wx.showToast({
        title: '下一次转盘生效哦~',
        icon: 'none'
      })
    }
    this.setData({
      musicflg: value
    })
    wx.setStorageSync(app.key.music, value)
  },

  //不重复抽取
  switch1Change2(e) {
    var value = e.detail.value;
    if (this.data.zhuanflg) {
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

  //快速决定
  switch1Change3(e) {
    var value = e.detail.value;
    if (this.data.zhuanflg) {
      wx.showToast({
        title: '当转盘停止转动后才有效',
        icon: 'none'
      })
      return;
    } else {
      this.setData({
        fastJuedin: value
      })
    }
  },

  //概率 == 如果不重复抽取开启的话 概率是无效的
  switch1Change4(e) {
    var value = e.detail.value;
    if (this.data.zhuanflg) {
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


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //实例化组件对象，这样有需要时就能调用组件内的方法
    this.zhuanpan = this.selectComponent("#zhuanpan");

    //可以这样调用 示例：this.zhuanpan.switchZhuanpan(data); 
    //上面这方法可用来切换转盘选项数据，参数可以看组件构造器中的switchZhuanpan方法
    this.getAwardsData(options.item)
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

  getAwardsData(item) {
    let awards = []
    const colorArr = [
      '#9900ff',
      '#0000ff',
      '#42a5f6',
      '#00cc00',
      '#cdcd00',
      '#ff6600',
      '#ff0000',
    ]
    if (item) {
      item = JSON.parse(item)
    } else {
      let zpItem = wx.getStorageSync(app.key.zpItem)
      if (zpItem) {
        item = zpItem
      } else {
        let zpList = wx.getStorageSync(app.key.zpList)
        if (zpList) {
          item = zpList[0]
          wx.setStorageSync(app.key.zpItem, item)
        } else {
          zpList = JSON.parse('[{"key":"吃什么？","value":["麻辣香锅","麻辣烫","串串香","面条","米粉","选择饿死"]},{"key":"喝什么？","value":["奶茶","冰阔落","白开水","啤酒","雪碧","凉茶","选择渴死"]},{"key":"玩什么？","value":["王者荣耀","吃鸡","刷抖音","剧本杀","狼人杀","看小说","选择发呆"]}]')
          wx.setStorageSync(app.key.zpList, zpList)
          item = zpList[0]
          wx.setStorageSync(app.key.zpItem, item)
        }
      }
    }
    const contentList = item.value
    for (let i = 0; i < contentList.length; i++) {
      if (i == contentList.length - 1) {
        const color = colorArr.pop()
        colorArr.unshift(color)
        const firstColor = awards[0].color
        if (firstColor == color) {
          const color2 = colorArr.pop()
          colorArr.unshift(color2)
          awards.push({
            id: i,                // id递增
            name: contentList[i],           // 选项名 超过9个字时字体会变小点 大于13个数时会隐藏掉超出的
            color: color2,    // 选项的背景颜色
            probability: 10
          })
        } else {
          awards.push({
            id: i,                // id递增
            name: contentList[i],           // 选项名 超过9个字时字体会变小点 大于13个数时会隐藏掉超出的
            color: color,    // 选项的背景颜色
            probability: 10
          })
        }
      } else {
        const color = colorArr.pop()
        colorArr.unshift(color)
        awards.push({
          id: i,                // id递增
          name: contentList[i],           // 选项名 超过9个字时字体会变小点 大于13个数时会隐藏掉超出的
          color: color,    // 选项的背景颜色
          probability: 10
        })
      }
    }
    const awardsConfig = {
      option: item.key,//转盘的标题名称
      awards: awards
    }

    this.setData({
      awardsConfig,
      'zhuanpanArr.awards': awards
    })

  },

  getConfig() {
    const music = wx.getStorageSync(app.key.music)
    if (music === '') {
      return
    }
    if (music != undefined && music != null) {
      this.setData({
        musicflg: music
      })
    }
  }
})