// pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    helpType:"",
    attention:"一般关注",
    sID:"",
    name:"",
    array1: [
      { name: '一般关注', value: '一般关注', checked: 'true'},
      { name: '非常关注', value:'非常关注'},
      { name:'特殊关注', value:'特殊关注'},
      { name:'重点关注' , value:'重点关注'}
    ],
    array2:[
      { name: '学业困难', value: '学业困难'},
      { name: '心理困难', value: '心理困难'},
      { name: '家庭困难', value: '家庭困难'}
    ],


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
  add:function(){
    var that=this;
    wx.getStorage({
      key: 'duty',
      success: function (res) {
        that.setData({
          duty: res.data
          })
          wx.getStorage({
          key: 'name',
          success: function (res) {
        that.setData({
          teachername: res.data
        })
        wx.getStorage({
          key: 'teacherId',
          success: function (res) {
            console.log(res.data)
            that.setData({
          teacherid: res.data
            })
            wx.getStorage({
          key: 'token',
          success: function (res) {
            that.setData({
              token: res.data
            })
            wx.request({
              url: 'http://180.76.249.233:8080/newhelp/api/archiveStudent',
              header: {
                "Authorization": that.data.token,
              },
              data: {
                studentId: that.data.sID,
                teacherId: that.data.teacherid,
                studyCondition: that.data.study,
                studyCondition: that.data.study,
                lifeCondition: that.data.life,
                helpType: that.data.helpType,
                bulidingBasis: that.data.base,
                otherCondition: that.data.other,
                healthCondition: that.data.healthy,
                              familyCondition: that.data.family,
                              name: that.data.name,
                              bulidingPerson: that.data.teachername,
                              bulidingPersonDuty: that.data.duty,
                              attentionType: that.data.attention
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
                            wx.redirectTo({
                              url: '/pages/now/now',
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
          }
        })
      }
    })
  },
  sIDinput: function (e) {
    var that = this;
    that.setData({
      sID: e.detail.value
    })
    console.log(this.data.sID)
  },

  nameInput: function (e) {
    var that = this
    that.setData({
      name: e.detail.value
    })
  },
  
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    var that = this
    that.setData({
      attention: e.detail.value
    })
    console.log(that.helpType)
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    var res=e.detail.value;
    var result;
    var that = this;
    console.log('length：', res.length)
    for(var i=0;i<res.length;i++){
      if(i==0){
        result = res[0]
      }
      if (i == 1) {
        result = result+" "+res[1]
      }
      if (i == 2) {
        result = result + " " + res[2]
      }
    }
    that.setData({
      helpType:result
    })
    console.log(that.data.helpType)

  },
  bindText1:function(e){
    this.setData({
      family: e.detail.value
    }) 
    console.log(this.data.family)       
  },
  bindText2: function (e) {
    this.setData({
      study: e.detail.value
    })
  },
  bindText3: function (e) {
    this.setData({
      healthy: e.detail.value
    })
  },
  bindText4: function (e) {
    this.setData({
      life: e.detail.value
    })
  },
  bindText5: function (e) {
    this.setData({
      other: e.detail.value
    })
  },
  bindText6: function (e) {
    this.setData({
      base: e.detail.value
    })
  },


})