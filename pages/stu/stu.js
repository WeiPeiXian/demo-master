// pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    tabCont: [{ "title": "个人信息", "index": "0" }, { "title": "家庭信息", "index": "1" }, { "title": "建档信息",  "index": "2" }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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

  now: function(){
    wx.navigateBack({
      url:'../now/now'
    })
  },
  xiugai: function(){
    wx.navigateTo({
      url: '../revise/revise',
    })
  },

  jiating: function(){
    wx.navigateTo({
      url: '../stu-family/stu-family',
    })
  },
  jiandang: function(){
    wx.navigateTo({
      url: '../stu-jiandang/stu-jiandang',
    })
  },
  GetCurrentTab: function (e) {
    console.log(e.detail.current);
    var that = this;
    this.setData({
      currentTab: e.detail.current
    });
    // console.log("11111"+this.data.currentTab);
  },
  swithNav: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current
    });

  }
  

})