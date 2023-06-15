// pages/detect/detect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image:"",
    image_base64:"",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  
  },
  face_detect:function(){
    var that = this;
    console.log(this.data.image_base64)
    wx.request({
      url: 'https://api-cn.faceplusplus.com/facepp/v3/detect', //仅为示例，并非真实的接口地址
      method:'POST',
      data: {
        api_key:'jRpCaZ34kqNYJ8Zppdc-yGGum_YkETov',
        api_secret:'Vr0PtRCw-ZFwYXTKVfi6aDNaSqlfunK3',
        image_base64:this.data.image_base64,
        return_attributes:"gender,age,smiling,beauty"
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data);
        that.setData({
          image: res.data
        });
      }
    })
  },
  choose_image:function(){
    var that = this
    wx.chooseMedia({
      count: 9,
      mediaType: ['image','video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        console.log(res.tempFiles[0].tempFilePath)
        that.urlTobase64(res.tempFiles[0].tempFilePath)
        that.setData({
          image:res.tempFiles[0].tempFilePath,
        })
        
        
        // console.log(res.tempFiles[0].size)
      }
    })
  },
  urlTobase64(url){
    var that = this
    wx.request({
      url:url,
      responseType: 'arraybuffer', //最关键的参数，设置返回的数据格式为arraybuffer
      success:res=>{
	      //把arraybuffer转成base64
            let base64 = wx.arrayBufferToBase64(res.data);        
            //不加上这串字符，在页面无法显示的哦
            base64　= 'data:image/jpeg;base64,' + base64　           
            //打印出base64字符串，可复制到网页校验一下是否是你选择的原图片呢
            console.log(base64)　
            that.setData({
              image_base64:base64,
            })
          }
    })
 },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})