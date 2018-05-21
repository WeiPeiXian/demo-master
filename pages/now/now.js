// pages/now/now.js
var app = getApp();
Page({
  data: {
    token:"",
    studentlist: [],
    teacherid: '',
    url: '',
    array1: ['年级', '2013级', '2014级', '2015级', '2016级', '2017级'],
    value1: ['', '2013', '2014', '2015', '2016', '2017'],
    array2: ['帮扶类型', '家庭困难', '学业困难', '心理困难'],
    value2: ['', '家庭困难', '学业困难', '心理困难'],
    array3: ['关注状态', '一般关注', '重点关注', '特殊关注', '定期关注', '非常关注'],
    value3: ['', '一般关注', '重点关注', '特殊关注', '定期关注', '非常关注'],
    index1:0,
    index2:0,
    index3:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.getlist()
    
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
    var that = this
    wx.getStorage({
      key: 'deleteok',
      success: function (res) {
        if (res.data) {
          that.getlist()
        }
      },
    })
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
  two: function () {
    wx.navigateTo({
      url: '../add/add'
    })
  },

  getlist:function(){
    var that = this;
    wx.getStorage({
      key: 'teacherId',
      success: function (res) {
        console.log(res.data)
        that.setData({
          teacherid: res.data
        })
        var arr = [
          'http://180.76.249.233:8080/newhelp/api/archiveStudents/',
          that.data.teacherid
        ]
        var str = arr.join('')
        that.setData({
          url: str
        })
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
                    studentlist: that2.data
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
  message: function (e) {
    wx.navigateTo({
      url: '../record/record'
    })
    var stuid = e.currentTarget.dataset.studentid
    wx.setStorage({
      key: 'studentid',
      data: stuid,
    })
    wx.setStorage({
      key: 'back2',
      data: false,
    })
    wx.setStorage({
      key: 'Index',
      data: "0",
    })
  },
  bindPickerChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
    this.search() 
  },
  bindPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
    this.search() 
  },
  bindPickerChange3:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index3: e.detail.value
    })
    this.search() 
  },
  search:function(){
    var that =this
    wx.getStorage({
      key: 'teacherId',
      success: function(res) {
        that.setData({
          teacherid: res.data
        })
        console.log(res.data)
        if ((that.data.index1 != 0) || (that.data.index2 != 0) || (that.data.index3!=0)){
        wx.request({
          url: 'http://180.76.249.233:8080/newhelp/api/archiveStudents',
          header: {
            "Authorization": that.data.token,
          },
          data: {
            teacherId: that.data.teacherid,
            grade:that.data.value1[that.data.index1],
            helpType: that.data.value2[that.data.index2],
            attentionType: that.data.value3[that.data.index3],
          },
          method: "POST",
          success: function (res) {
            
            if (res.data.success == true) {
              that.setData({
                studentlist:res.data.data
              })
              console.log(res.data.data)
            }
            else {
              console.log(res.data)
            }
          },
          fail:function(res){
            console.log(res.data)
          }
        })
      }
      else{
        that.getlist()
      }
    }
  })
  }
})