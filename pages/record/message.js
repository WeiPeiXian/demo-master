var util = require('../../utils/util.js')
Page({
  data: {
    array: ['周联系简易记录表', '面谈记录表', '家长联系记录表', '研讨及总结记录'],
    index: 0,
    showView: [false, false, true, false, true],
    date: util.formatTime(new Date()),
  },
  onLoad: function (options) {
    this.getdata()
  },
  onReady: function () {

  },
  onShow: function () {
    var that = this
    wx.getStorage({
      key: 'back',
      success: function (res) {
        console.log(res.data)
        if (res.data) {
          that.getdata()
        }
      },
    })
  },
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  backok: function () {
    wx.reLaunch({
      url: '/pages/login/login',
    })
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
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.data.record.date = e.detail.value
    this.setData({
      date: e.detail.value
    })
  },
  showView: function () {
    if (this.data.index == 0) {
      this.setData({
        showView: [false, false, true, false, true]
      })
    }
    if (this.data.index == 1) {
      this.setData({
        showView: [true, false, false, false, true]
      })
    }
    if (this.data.index == 2) {
      this.setData({
        showView: [true, true, true, false, true]
      })
    }
    if (this.data.index == 3) {
      this.setData({
        showView: [true, false, false, true, true]
      })
    }
  },
  recorderInput: function (e) {
    this.data.record.recorder = e.detail.value
  },
  witnessInput: function (e) {
    this.data.record.witness = e.detail.value
  },
  typeInput: function (e) {
    this.data.record.way = e.detail.value
  },
  participantInput: function (e) {
    this.data.record.participant = e.detail.value
  },
  locationInput: function (e) {
    this.data.record.location = e.detail.value
  },
  bindText1: function (e) {
    this.data.record.content = e.detail.value
  },
  bindText2: function (e) {
    this.data.record.comment = e.detail.value
  },
  add: function () {
    wx.navigateTo({
      url: './revise',
    })
  },
  getdata:function(){
    var that = this
    wx.getStorage({
      key: 'Index',
      success: function (res) {
        that.setData({
          index: res.data
        })
        that.showView()
      },
    })
    wx.getStorage({
      key: 'token',
      success: function (res) {
        that.setData({
          token: res.data
        })
      }
    })
    wx.getStorage({
      key: 'recordid',
      success: function (res) {
        that.setData({
          recordid: res.data
        })
        wx.request({
          url: 'https://api.uestcsise.cn/newhelp/api/record/' + that.data.recordid,
          header: {
            "Authorization": that.data.token
          },
          method: "GET",
          success: function (res) {

            if (res.data.success == true) {
              var that2 = res.data
              console.log(that2.data)
              that.setData({
                record: that2.data
              })
              wx.setStorage({
                key: 'record',
                data: that2.data,
              })
            }
            else {
              wx.showToast({
                title: "连接失败",
                icon: "fail"
              })
            }
          },
          fail: function (res) {
            console.log(that.data.url)
          }
        })
      },
    })
    wx.getStorage({
      key: 'record',
      success: function (res) {
        that.setData({
          record: res.data
        })
      },
    })
  }
})