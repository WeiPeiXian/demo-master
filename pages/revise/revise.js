var util = require('../../utils/util.js')

Page({
  data: {
    tab: 0,
    date: util.formatTime(new Date()),
    array2: [
      { name: '学业困难', value: '学业困难' },
      { name: '心理困难', value: '心理困难' },
      { name: '家庭困难', value: '家庭困难' }
    ], 
    helpType:'',
    array1: [
      { name: '一般关注', value: '一般关注', checked: 'true' },
      { name: '重点关注', value: '重点关注' },
      { name: '特殊关注', value: '特殊关注' },
      { name: '非常关注', value: '非常关注' },
      { name: '定期关注', value: '定期关注' },
    ],

  },

  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'studentid',
      success: function(res) {
        that.setData(
          {
            studentid:res.data
          }
        )
      },
    })
    wx.getStorage({
      key: 'all',
      success: function (res) {
        console.log(res.data)
        that.setData({
          all: res.data
        })
      },
    })
    wx.getStorage({
      key: 'archive',
      success: function (res) {
        that.setData({
          archive: res.data
        })
        that.init()
      },
    })
  },
  onReady: function () {
    var that =this
    that.setData({
      all:that.data.all,
      archive:that.data.archive
    })
  },
  onShow: function () {
  },
   backok: function () {
    wx.reLaunch({
      url: '/pages/login/login',
    })
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
  gradeInput: function (e) {
    
    this.data.archive.grade = e.detail.value

  },
  politicalInput: function (e) {

    this.data.archive.politicalStatus = e.detail.value

  },
  majorInput: function (e) {

    this.data.archive.major = e.detail.value

  },
  dutyInput: function (e) {

    this.data.archive.duty = e.detail.value

  },
  susheInput: function (e) {

    this.data.archive.dormitory = e.detail.value

  },
  contactInput: function (e) {

    this.data.archive.contactWay = e.detail.value

  },
  bindText0: function (e) {
    this.data.archive.familyAddress = e.detail.value
  },
  bindText1: function (e) {
    this.data.archive.familyCondition = e.detail.value
  },
  bindText2: function (e) {
    this.data.archive.studyCondition = e.detail.value
  },
  bindText3: function (e) {
    this.data.archive.healthCondition = e.detail.value
  },
  bindText4: function (e) {
    this.data.archive.lifeCondition = e.detail.value
  },
  bindText5: function (e) {
    this.data.archive.otherCondition = e.detail.value
  },
  bindText6: function (e) {
    this.data.archive.bulidingBasis = e.detail.value

  },
  revise: function (e) {
    var that = this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        wx.request({
          url: 'https://api.uestcsise.cn/newhelp/api/archiveStudent',
          header: {
            "Authorization": res.data,
          },
          data: that.data.archive,
          method: "put",
          success: function (res) {
            if (res.data.success == true) {
              var that2 = res.data
              console.log(that2.message)
              wx.showToast({
                title: res.data.message,
                icon: "success"
              })
              wx.setStorage({
                key: 'back',
                data: true,
              })
              wx.navigateBack({
                delta:1
              })
            }
            else {
              console.log(res.data)
              wx.showToast({
                title: "修改失败",
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

  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    var res = e.detail.value;
    var result;
    var that = this;
    for (var i = 0; i < res.length; i++) {
      if (i == 0) {
        result = res[0]
      }
      if (i == 1) {
        result = result + " " + res[1]
      }
      if (i == 2) {
        result = result + " " + res[2]
      }
    }
    that.data.archive.helpType = e.detail.value

    console.log(that.data.helpType)

  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    var that = this
    that.data.archive.attentionType = e.detail.value
  },
  init:function(){
    var that= this;
    var t = that.data.archive.helpType;
    if (t.match("学业困难")!==null){
      that.data.array2[0].checked = 'true' 
    }
    if (t.match("心理困难") !== null) {
      that.data.array2[1].checked = 'true' 
    }
    if (t.match("家庭困难") !== null) {
      that.data.array2[2].checked = 'true' 
    }
    that.setData({
      array2:that.data.array2
    })
    var m = that.data.archive.attentionType;
    if (m.match("一般关注") !== null) {
      that.setData({
        array1: [{ name: '一般关注', value: '一般关注', checked: 'true' },
        { name: '重点关注', value: '重点关注' },
        { name: '特殊关注', value: '特殊关注' },
        { name: '非常关注', value: '非常关注' },
        { name: '定期关注', value: '定期关注' },]
      })

    } 
    if (m.match("重点关注") !== null) {
      that.setData({
        array1: [{ name: '一般关注', value: '一般关注' },
          { name: '重点关注', value: '重点关注', checked: 'true' },
        { name: '特殊关注', value: '特殊关注' },
        { name: '非常关注', value: '非常关注' },
        { name: '定期关注', value: '定期关注' },]
      })
    }
    if (m.match("特殊关注") !== null) {
      that.setData({
        array1: [{ name: '一般关注', value: '一般关注' },
        { name: '重点关注', value: '重点关注' },
        { name: '特殊关注', value: '特殊关注', checked: 'true' },
        { name: '非常关注', value: '非常关注' },
        { name: '定期关注', value: '定期关注' },]

      })
    }
    if (m.match("非常关注") !== null) {
      that.setData({
        array1: [{ name: '一般关注', value: '一般关注' },
        { name: '重点关注', value: '重点关注' },
        { name: '特殊关注', value: '特殊关注' },
        { name: '非常关注', value: '非常关注', checked: 'true'},
        { name: '定期关注', value: '定期关注'},]

      })
    } 
    if (m.match("定期关注") !== null) {
      that.setData({
        array1: [{ name: '一般关注', value: '一般关注' },
        { name: '重点关注', value: '重点关注' },
        { name: '特殊关注', value: '特殊关注' },
        { name: '非常关注', value: '非常关注' },
        { name: '定期关注', value: '定期关注', checked: 'true'},]
        
      })
    } 
    console.log(that.data.array1)
    console.log(that.data.array2)

  }
})