var util = require('../../utils/util.js')
Page({
  data: {
    array: ['周联系简易记录表', '面谈记录表', '家长联系记录表', '研讨及总结记录'],
    index:0,
    showView: [false, false, true, false,true],
    date: util.formatTime(new Date()),
    
  },

  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'Index',
      success: function(res) {
        that.setData({
          index:res.data
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
    this.setData({
      date: e.detail.value
    })
  },
  bindPickerChange:function(e){
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        index: e.detail.value
      })
      wx.setStorage({
        key: 'Index',
        data: this.data.index,
      })
      this.showView()
  },
  showView:function(){
    if(this.data.index==0){
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
        showView: [true, false, false,true, true]
      })
    }
  },
  recorderInput:function(e){
    this.setData({
      recorder: e.detail.value
    })
  },
  witnessInput: function (e) {
    this.setData({
      witness: e.detail.value
    })
  },
  typeInput: function (e) {
    this.setData({
      Type: e.detail.value
    })
  },
  participantInput: function (e) {
    this.setData({
      participant: e.detail.value
    })
  },
  locationInput: function (e) {
    this.setData({
      location: e.detail.value
    })
  },
  bindText1: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  bindText2: function (e) {
    this.setData({
      comment: e.detail.value
    })
  },
  add: function (e) {
    var that =this
    wx.getStorage({
      key: 'token',
      success: function(res) {
        wx.request({
          url: 'http://180.76.249.233:8080/newhelp/api/record',
          header: {
            "Authorization": res.data,
          },
          data: {
            studentId: that.data.studentid,
            recordName: that.data.array[that.data.index],
            recordTime: that.data.date,
            location: that.data.location,
            witness: that.data.witness,
            recorder: that.data.recorder,
            participant: that.data.participant,
            content: that.data.content,
            comment: that.data.comment,
            way: that.data.Type
          },
          method: "post",
          success: function (res) {
            if (res.data.success == true) {
              var that2 = res.data
              console.log(that2.message)
              wx.showToast({
                title: res.data.message,
                icon: "success"
              })
              wx.setStorage({
                key: 'back2',
                data: true,
              })
              wx.navigateBack({
                delta:1
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