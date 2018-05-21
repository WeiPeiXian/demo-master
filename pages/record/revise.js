var util = require('../../utils/util.js')
Page({
  data: {
    array: ['周联系简易记录表', '面谈记录表', '家长联系记录表', '研讨及总结记录'],
    index: 0,
    showView: [false, false, true, false, true],
    date: util.formatTime(new Date()),
  },
  onLoad: function (options) {
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
      key: 'studentid',
      success: function (res) {
        that.setData({
          studentid: res.data
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
  },
  onReady: function () {

  },
  onShow: function () {

  },
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
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.data.record.recordTime = e.detail.value
    this.setData({
      record:this.data.record
    })
  },
  backok: function () {
    wx.reLaunch({
      url: '/pages/login/login',
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
  add: function (e) {
    var that = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: 'http://api.changename.xin:8080/newhelp/api/record',
          header: {
            "Authorization": res.data,
          },
          data: that.data.record,
          method: "put",
          success: function (res) {
            if (res.data.success == true) {
              var that2 = res.data
              console.log(that2.message)
              wx.showToast({
                title: "更新成功",
                icon: "success"
              })
              wx.setStorage({
                key: 'back',
                data: true,
              })
              wx.navigateBack({
                delta: 1
              })
            }
            else {
              console.log(res.data)
              wx.showToast({
                title: "添加失败",
                icon: "none"
              })
            }
          },
          fail: function (res) {
            console.log(res);
            console.log(1)
          }
        })
      },
    })
  },
})