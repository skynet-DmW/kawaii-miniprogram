export function getZpList() {
  const zpList = getApp().globalData.zpList
  if (zpList.length < 1) {
    zpList.push({
      option: '今天吃什么？',// 转盘的标题名称
      awards: [
        {
          id: 0, // id递增
          name: "麻辣香锅", // 选项名 超过9个字时字体会变小点 大于13个数时会隐藏掉超出的
          color: '#ff0000', // 选项的背景颜色
          probability: 10 // 概率 0代表永远也转不到这个选项，数字越大概率也就越大,data中的probability属性设置为true时是才生效, 这属性也必须填写，不填写会出错
        },
        {
          id: 1,
          name: "啃骨头",
          color: '#ff6600',
          probability: 10
        },
        {
          id: 2,
          name: "火锅",
          color: '#fecc11',
          probability: 10
        },
        {
          id: 3,
          name: "串串香",
          color: '#00cc00',
          probability: 10
        },
        {
          id: 4,
          name: "小龙虾",
          color: '#42a5f6',
          probability: 10
        },
        {
          id: 5,
          name: "嗦粉",
          color: '#0000ff',
          probability: 10
        },
        {
          id: 6,
          name: "选择饿死",
          color: '#9900ff',
          probability: 10
        }
      ]
    })
    zpList.push({
      option: '喝什么？',// 转盘的标题名称
      awards: [
        {
          id: 0, // id递增
          name: "奶茶", // 选项名 超过9个字时字体会变小点 大于13个数时会隐藏掉超出的
          color: '#ff0000', // 选项的背景颜色
          probability: 0 // 概率 0代表永远也转不到这个选项，数字越大概率也就越大,data中的probability属性设置为true时是才生效, 这属性也必须填写，不填写会出错
        },
        {
          id: 1,
          name: "冰阔落",
          color: '#ff6600',
          probability: 10
        },
        {
          id: 2,
          name: "白开水",
          color: '#fecc11',
          probability: 10
        },
        {
          id: 3,
          name: "啤酒",
          color: '#00cc00',
          probability: 10
        },
        {
          id: 4,
          name: "雪碧",
          color: '#42a5f6',
          probability: 10
        },
        {
          id: 5,
          name: "凉茶",
          color: '#0000ff',
          probability: 10
        },
        {
          id: 6,
          name: "选择渴死",
          color: '#9900ff',
          probability: 10
        }
      ]
    })
    zpList.push({
      option: '玩什么？',// 转盘的标题名称
      awards: [
        {
          id: 0, // id递增
          name: "王者荣耀", // 选项名 超过9个字时字体会变小点 大于13个数时会隐藏掉超出的
          color: '#ff0000', // 选项的背景颜色
          probability: 0 // 概率 0代表永远也转不到这个选项，数字越大概率也就越大,data中的probability属性设置为true时是才生效, 这属性也必须填写，不填写会出错
        },
        {
          id: 1,
          name: "刷抖音",
          color: '#ff6600',
          probability: 10
        },
        {
          id: 2,
          name: "剧本杀",
          color: '#fecc11',
          probability: 10
        },
        {
          id: 3,
          name: "狼人杀",
          color: '#00cc00',
          probability: 10
        },
        {
          id: 4,
          name: "看小说",
          color: '#42a5f6',
          probability: 10
        },
        {
          id: 5,
          name: "吃鸡",
          color: '#0000ff',
          probability: 10
        },
        {
          id: 6,
          name: "选择发呆",
          color: '#9900ff',
          probability: 10
        }
      ]
    })
  }
  return zpList;
}

export function getZpItem() {
  const zpItem = getApp().globalData.zpItem
  return Object.keys(zpItem).length === 0 ? this.getZpList()[0] : zpItem
}

// 获取音乐配置
export function getMusicFlag() {
  return getApp().globalData.musicFlag || true
}

// 修改音乐配置
export function putMusicFlag(musicFlag) {
  return getApp().globalData.musicFlag = musicFlag
}

