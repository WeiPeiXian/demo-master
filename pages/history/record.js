// pages/history/record.js
const app = getApp()
var template = require('../../template/template.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['周联系简易记录表', '面谈记录表', '家长联系记录表', '研讨及总结记录'],
    list:[],
    objectArray: [
      {
        id: 0,
        name: '周联系简易记录表'
      },
      {
        id: 1,
        name: '面谈记录表'
      },
      {
        id: 2,
        name: '家长联系记录表'
      },
      {
        id: 3,
        name: '研讨及总结记录'
      }
    ],
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    template.tabbar("tabBar", 0, this)
    var that = this;
    var that = this;
    wx.getStorage({
      key: 'hArchiveId',
      success: function (res) {
        console.log(res.data)
        that.setData({
          hArchiveId: res.data
        })
        var i =that.data.index
        var str = 'http://180.76.249.233:8080/newhelp/api/historyRecords/' + that.data.array[i] + '/' + res.data
        that.setData({
          url: str
        })
        console.log(that.data.url)
        wx.getStorage({
          key: 'token',
          success: function (res) {
            that.setData({
              token: res.data
            })
            wx.request({
              url: that.data.url,
              header: {
                "Authorization": that.data.token
              },
              method: "GET",
              success: function (res) {
                if (res.data.success == true) {
                  var that2 = res.data
                  console.log(that2.data)
                  that.setData({
                    list: that2.data
                  })

                }
                else {
                  console.log(res.data)
                  wx.showToast({
                    title: "连接失败",
                    icon: "fail"
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
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var i = e.detail.value
    this.setData({
      index: i,
    })
    var that = this;
    var that = this;
    wx.getStorage({
      key: 'hArchiveId',
      success: function (res) {
        console.log(res.data)
        that.setData({
          hArchiveId: res.data
        })
        var i = that.data.index
        var str = 'http://180.76.249.233:8080/newhelp/api/historyRecords/' + that.data.array[i] + '/' + res.data
        that.setData({
          url: str
        })
        console.log(that.data.url)
        wx.getStorage({
          key: 'token',
          success: function (res) {
            that.setData({
              token: res.data
            })
            wx.request({
              url: that.data.url,
              header: {
                "Authorization": that.data.token
              },
              method: "GET",
              success: function (res) {
                if (res.data.success == true) {
                  var that2 = res.data
                  console.log(that2.data)
                  that.setData({
                    list: that2.data
                  })

                }
                else {
                  console.log(res.data)
                  wx.showToast({
                    title: "连接失败",
                    icon: "fail"
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
  },
  
})