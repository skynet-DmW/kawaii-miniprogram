function cloneObj(obj) {
  if (typeof obj !== 'object') {
    return obj;
  } else {
    var newobj = obj.constructor === Array ? [] : {};
    for (var i in obj) {
      newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
    }
    return newobj;
  }
}

// 获取转盘列表
export function getZpList() {
  const zpList = getApp().globalData.zpList
  if (zpList.length < 1) {
    zpList.push({
      zpId: 1,
      title: '今天吃什么？',// 转盘的标题名称
      awards: [
        {
          awardId: 0, // id递增
          name: "麻辣香锅", // 选项名 超过9个字时字体会变小点 大于13个数时会隐藏掉超出的
          color: '#ff0000', // 选项的背景颜色
          probability: 10 // 概率 0代表永远也转不到这个选项，数字越大概率也就越大,data中的probability属性设置为true时是才生效, 这属性也必须填写，不填写会出错
        },
        {
          awardId: 1,
          name: "啃骨头",
          color: '#ff6600',
          probability: 10
        },
        {
          awardId: 2,
          name: "火锅",
          color: '#fecc11',
          probability: 10
        },
        {
          awardId: 3,
          name: "串串香",
          color: '#00cc00',
          probability: 10
        },
        {
          awardId: 4,
          name: "小龙虾",
          color: '#42a5f6',
          probability: 10
        },
        {
          awardId: 5,
          name: "嗦粉",
          color: '#0000ff',
          probability: 10
        },
        {
          awardId: 6,
          name: "选择饿死",
          color: '#9900ff',
          probability: 10
        }
      ]
    })
    zpList.push({
      zpId: 2,
      title: '今天喝什么？',// 转盘的标题名称
      awards: [
        {
          awardId: 0, // id递增
          name: "奶茶", // 选项名 超过9个字时字体会变小点 大于13个数时会隐藏掉超出的
          color: '#ff0000', // 选项的背景颜色
          probability: 10 // 概率 0代表永远也转不到这个选项，数字越大概率也就越大,data中的probability属性设置为true时是才生效, 这属性也必须填写，不填写会出错
        },
        {
          awardId: 1,
          name: "冰阔落",
          color: '#ff6600',
          probability: 10
        },
        {
          awardId: 2,
          name: "白开水",
          color: '#fecc11',
          probability: 10
        },
        {
          awardId: 3,
          name: "啤酒",
          color: '#00cc00',
          probability: 10
        },
        {
          awardId: 4,
          name: "雪碧",
          color: '#42a5f6',
          probability: 10
        },
        {
          awardId: 5,
          name: "凉茶",
          color: '#0000ff',
          probability: 10
        },
        {
          awardId: 6,
          name: "选择渴死",
          color: '#9900ff',
          probability: 10
        }
      ]
    })
    zpList.push({
      zpId: 3,
      title: '今天玩什么？',// 转盘的标题名称
      awards: [
        {
          awardId: 0, // id递增
          name: "王者荣耀", // 选项名 超过9个字时字体会变小点 大于13个数时会隐藏掉超出的
          color: '#ff0000', // 选项的背景颜色
          probability: 10 // 概率 0代表永远也转不到这个选项，数字越大概率也就越大,data中的probability属性设置为true时是才生效, 这属性也必须填写，不填写会出错
        },
        {
          awardId: 1,
          name: "刷抖音",
          color: '#ff6600',
          probability: 10
        },
        {
          awardId: 2,
          name: "剧本杀",
          color: '#fecc11',
          probability: 10
        },
        {
          awardId: 3,
          name: "狼人杀",
          color: '#00cc00',
          probability: 10
        },
        {
          awardId: 4,
          name: "看小说",
          color: '#42a5f6',
          probability: 10
        },
        {
          awardId: 5,
          name: "吃鸡",
          color: '#0000ff',
          probability: 10
        },
        {
          awardId: 6,
          name: "选择发呆",
          color: '#9900ff',
          probability: 10
        }
      ]
    })
  }
  return cloneObj(zpList);
}

// 获取默认转盘数据
export function getDefaultZpItem() {
  const zpItem = getApp().zpItem
  return zpItem && Object.keys(zpItem).length > 0 ? cloneObj(zpItem) : cloneObj(getZpList()[0])
}

// 获取转盘数据
export function getZpItem(zpId) {
  const zpList = getZpList()
  const zpItem = zpList.find((item) => item.zpId == zpId)
  return zpItem ? cloneObj(zpItem) : null
}

// 保存、修改转盘数据
export function postZpItem(zpItem) {
  const zpList = getZpList()
  if (zpItem.zpId) {
    const index = zpList.findIndex((item) => item.zpId === zpItem.zpId)
    zpList[index] = zpItem
  } else {
    zpItem.zpId = zpList.length + 1
    zpList.push(zpItem)
  }
  getApp().globalData.zpList = [...zpList]
  return zpItem
}

// 删除转盘数据
export function delZpItem(zpId) {
  const zpList = getApp().globalData.zpList
  const newZpList = zpList.filter((item) => item.zpId !== zpId)
  getApp().globalData.zpList = newZpList
}

// 获取音乐配置
export function getMusicFlag() {
  return getApp().globalData.musicFlag
}

// 修改音乐配置
export function putMusicFlag(musicFlag) {
  return getApp().globalData.musicFlag = musicFlag
}

