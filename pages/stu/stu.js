// pages/add/add.js
const app = getApp()
var template = require('../../template2/template2.js');
var api = 'http://180.76.249.233:8080/newhelp/api/baseStudent/all/';
var studentid = '';
var token = '';
Page({
  data: {
    currentTab: 0,
    tabCont: [
      "个人信息",
      "家庭信息",
      "建档信息"
    ],
    show: [false, true, true],
    all: '',
    archive: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    template.tabbar("tabBar", 1, this)
    var that = this;
    // that.setData({
    //   currentTab: 1,
    // })
    
    wx.getStorage({
      key: 'token',
      success: function (res) {
        token = res.data;
        that.setData({
          token: res.data
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
          key: 'studentid',
          success: function (res) {
            studentid = res.data
            wx.request({
              url: 'http://180.76.249.233:8080/newhelp/api/archiveStudent/' + studentid,
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

    this.setData({
      archive: this.data.archive,
    })
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
  setHeight: function () {
    var height1 = 300;
    var height2 = 300;
    var height3 = 300;
    var height4 = 300;
    var height5 = 300;
    var height6 = 300;
    if (this.data.archive.familyCondition != null)
      height1 = this.data.archive.familyCondition.length * 2.5
    if (height1 < 300) {
      height1 = 300
    }
    if (this.data.archive.studyCondition != null)
      height2 = this.data.archive.studyCondition.length * 2.5

    if (height2 < 300) {
      height2 = 300
    }
    if (this.data.archive.healthCondition != null)
      height3 = this.data.archive.healthCondition.length * 2.5
    if (height3 < 300) {
      height3 = 300
    }
    if (this.data.archive.lifeCondition != null)
      height4 = this.data.archive.lifeCondition.length * 2.5
    if (height4 < 300) {
      height4 = 300
    }
    if (this.data.archive.otherCondition != null)
      height5 = this.data.archive.otherCondition.length * 2.5
    if (height5 < 300) {
      height5 = 300
    }
    if (this.data.archive.bulidingBasis != null)

      height6 = this.data.archive.bulidingBasis.length * 2.5
    if (height6 < 300) {
      height6 = 300
    }
    this.setData({
        height1: height1,
        height2: height2,
        height3: height3,
        height4: height4,
        height5: height5,
        height6: height6,
    })
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    if (this.data.currentTab == 0) {
      this.setData({
        show: [false, true, true]
      })
    }
    if (this.data.currentTab == 1) {
      this.setData({
        show: [true, false, true]
      })
    }
    if (this.data.currentTab == 2) {
      this.setData({
        show: [true, true, false]
      })
    }

  },
})