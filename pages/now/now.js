// pages/now/now.js
var app = getApp();
Page({
  data: {
    token:"",
    studentlist: [],
    teacherid: '',
    url: '',
    array1: ['年级', '2013级', '2014级', '2015级', '2016级', '2017级'],
    objectArray: [
      {
        id: 0,
        name: '年级'
      },
      {
        id: 1,
        name: '2013级'
      },
      {
        id: 2,
        name: '2014级'
      },
      {
        id: 3,
        name: '2015级'
      },
      {
        id: 4,
        name: '2016级'
      },
      {
        id: 5,
        name: '2017级'
      }
    ],
    array2: ['帮扶类型', '家庭困难', '学业困难', '心理困难'],
    objectArray: [
      {
        id: 0,
        name: '帮扶类型'
      },
      {
        id: 1,
        name: '家庭困难'
      },
      {
        id: 2,
        name: '学业困难'
      },
      {
        id: 3,
        name: '心理困难'
      }
    ],
    array4:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17'],
    array3: ['关注状态', '一般关注', '重点关注', '非常关注', '特殊关注'],
    objectArray: [
      {
        id: 0,
        name: '关注状态'
      },
      {
        id: 1,
        name: '一般关注'
      },
      {
        id: 2,
        name: '重点关注'
      },
      {
        id: 3,
        name: '非常关注'
      },
      {
        id: 4,
        name: '特殊关注'
      }
    ],
    index1:0,
    index2:0,
    index3:0,
 token:'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0IiwiaWF0IjoxNTI1MDkwMzYyLCJpc3MiOiJTaGVuIn0dhMN_vBBmk16Sa3EOwIHnWNET-smmvXeAooRlxxvEtLzjpnrX-Fo-e01yKIhmZoj0XCNLw9nwD1CXPPlBrqmUw'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
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
      url:that.data.url,
      header: {
        "Authorization": that.data.token
      },
      method: "GET",
      success: function (res) {
        if (res.data.success == true) {
          var that2 = res.data
          console.log(that2.data)
          that.setData({
            studentlist:that2.data
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
  two: function () {
    wx.navigateTo({
      url: '../add/add'
    })
  },
  message: function (e) {
    wx.navigateTo({
      url: '../stu/stu'
    })
    var stuid = e.currentTarget.dataset.studentid
    wx.setStorage({
      key: 'studentid',
      data: stuid,
    })
  },
  

  bindPickerChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },
  bindPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },
  bindPickerChange3:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index3: e.detail.value
    })
  }
})