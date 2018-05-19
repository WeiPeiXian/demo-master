const app = getApp()
var template = require('../../template/template.js');

var api = 'http://180.76.249.233:8080/newhelp/api/baseStudent/all/' ;
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
    all:'',
    height:1000,
    h1:40,
    h2: 40,
    h3: 40,
    h4: 40,
    h5: 40,
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
        that.setData({
          token:res.data
        })
        wx.getStorage({
          key: 'studentid',
          success: function (res) {
            studentid = res.data
            var url = api + studentid
            wx.request({
              url: url,
              header: {
                "Authorization": token
              },
              method: "GET",
              success: function (res) {
                if (res.data.success == true) {
                  var that2 = res.data
                  console.log(that2.data)
                  that.setData({
                    all: that2.data
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
            wx.request({
              url: 'http://180.76.249.233:8080/newhelp/api/historyArchive/'+archiveid,
              header: {
                "Authorization": that.data.token
              },
              method: "GET",
              success: function (res) {
                if (res.data.success == true) {
                  var that2 = res.data
                  console.log(that2.data)
                  that.setData({
                    archive: that2.data
                  })
                  that.setHeight()
                }
                else {
                  console.log(res.data)
                  wx.showToast({
                    title: "连接失败",
                    icon: "none"
                  })
                }
              },
              
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
  onShareAppMessage: function () {

  },
 
  GetCurrentTab: function (e) {
    console.log(e.detail.current);
    var that = this;
    this.setData({
      currentTab: e.detail.current
    });
  },
  setHeight:function(){
    var height = 600 + this.data.archive.familyCondition.length * 1.5+
      this.data.archive.studyCondition.length * 1.5+
      this.data.archive.healthCondition.length * 1.5+
      this.data.archive.lifeCondition.length * 1.5+         
      this.data.archive.otherCondition.length * 1.5+ 
      this.data.archive.bulidingBasis.length*1.5
    console.log(this.data.archive.studyCondition.length)
    if(height>1000){
    this.setData({
      height:height
    })
    }
  },
  swithNav: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current
    });
  }
  

})