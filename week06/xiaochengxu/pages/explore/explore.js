const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    iconList: [{
      icon: 'cardboardfill',
      color: 'red',
      badge: 120,
      name: 'VR'
    }, {
      icon: 'recordfill',
      color: 'orange',
      badge: 1,
      name: '录像'
    }, {
      icon: 'picfill',
      color: 'yellow',
      badge: 0,
      name: '图像'
    }, {
      icon: 'noticefill',
      color: 'olive',
      badge: 22,
      name: '通知'
    }, {
      icon: 'upstagefill',
      color: 'cyan',
      badge: 0,
      name: '排行榜'
    }, {
      icon: 'clothesfill',
      color: 'blue',
      badge: 0,
      name: '皮肤'
    }, {
      icon: 'discoverfill',
      color: 'purple',
      badge: 0,
      name: '发现'
    }, {
      icon: 'questionfill',
      color: 'mauve',
      badge: 0,
      name: '帮助'
    }, {
      icon: 'commandfill',
      color: 'purple',
      badge: 0,
      name: '问答'
    }, {
      icon: 'brandfill',
      color: 'mauve',
      badge: 0,
      name: '版权'
    }],
    gridCol:3,
    skin: false,
    pois:[]
  },

  onLoad:function (options) {
      var that = this
      // 1.通过用户搜索关键词获取位置信息
    wx.request({
        url: 'https://restapi.amap.com/v3/place/text?parameters', //仅为示例，并非真实的接口地址
        data: {
          key: 'e12b6979c90c84b45aa6a520367160b7',
          keywords: '天河区'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          console.log(res.data.pois[0].location)
          // 2.通过位置信息获取周边的POI信息
          wx.request({
            url: 'https://restapi.amap.com/v3/place/around?parameters ', //仅为示例，并非真实的接口地址
            data: {
                key: 'e12b6979c90c84b45aa6a520367160b7',
              location: res.data.pois[0].location
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success (res) {
              console.log(res.data)
              that.setData({
                  pois:res.data.pois
              })
            }
          })
        }
      })
},
})