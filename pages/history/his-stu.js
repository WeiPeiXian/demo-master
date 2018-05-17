const app = getApp()
var template = require('../../template/template.js');
var api = 'http://180.76.249.233:8080/' ;
var per = 'newhelp/api/baseStudent/personal/';
var fam = 'newhelp/api/baseStudent/family/';
var studentid = '';
var archiveid = '';
var token = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    tabCont: [{ "title": "个人信息", "index": "0" }, { "title": "家庭信息", "index": "1" }, { "title": "建档信息", "index": "2" }],
    personal:'',
    height:1000,
    h1:40,
    h2: 40,
    h3: 40,
    h4: 40,
    h5: 40,
    family:'',
    archive:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    template.tabbar("tabBar", 1, this)
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function(res) {
        token =res.data;
        wx.getStorage({
          key: 'studentid',
          success: function (res) {
            studentid = res.data
            var url1 = api + fam + studentid
            var url2 = api + per + studentid
            wx.request({
              url: url1,
              header: {
                "Authorization": token
              },
              method: "GET",
              success: function (res) {
                if (res.data.success == true) {
                  var that2 = res.data
                  console.log(that2.data)
                  that.setData({
                    family: that2.data
                  })

                }
                else {
                  console.log(res.data)
                  wx.showToast({
                    title: "连接失败",
                    icon: "none"
                  })
                }
              },
              fail: function (res) {
                console.log(res);
              }
            })
            wx.request({
              url: url2,
              header: {
                "Authorization": token
              },
              method: "GET",
              success: function (res) {
                if (res.data.success == true) {
                  var that2 = res.data
                  console.log(that2.data)
                  that.setData({
                    personal: that2.data
                  })

                }
                else {
                  console.log(res.data)
                  wx.showToast({
                    title: "连接失败",
                    icon: "none"
                  })
                }
              },
              fail: function (res) {
                console.log(res);
              }
            })
          },
        })
        wx.getStorage({
          key: 'hArchiveId',
          success: function (res) {
            archiveid = res.data
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
  onShareAppMessage: function () {

  },
 
  GetCurrentTab: function (e) {
    console.log(e.detail.current);
    var that = this;
    this.setData({
      currentTab: e.detail.current
    });
  },
  swithNav: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current
    });
  }
  

})