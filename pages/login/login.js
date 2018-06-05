var app=getApp();
var userinfo = [];
var judge = true;
var util = require('../../utils/util.js')
//使用 util.reload()
Page({
  data: {
    username: '',
    password: '',
    
  },
  onLoad(){
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function(res) {
        userinfo = res.data
      },
    })
    wx.getStorage({
      key: 'user',
      success: function(res) {
        console.log(res.data)
        if(res.data.length!==0){
          that.setData({
            username:res.data.name,
            password:res.data.password
          })
        }
      },
    })
  },
  phoneInput :function(e){
   var name = e.detail.value
   var that=this;
   var n = userinfo.length
   var i;
   
   for(i=0;i<n;i++){
     var u = userinfo[i].name
     if ((name.match(u))!=null){
       console.log(name.match(userinfo[i]))
        this.setData({
          username: userinfo[i].name,
          password: userinfo[i].password,
        })
        judge =true;
     }
     else judge =false
   }
   that.setData({
     username: name
   })
  },
  passwordInput :function(e){
   var that=this
   that.setData({
     password: e.detail.value
   })
  },

  login: function(){
    if(userinfo.length ==0){
      judge = false;
    }
    var that = this.data
    var s = this;
    if(!judge){
      userinfo[userinfo.length]={
        name: s.data.username,
        password: s.data.password
      }
    }
    wx.setStorage({
      key: 'user',
      data: {
        name: s.data.username,
        password:s.data.password
      },
    })
    wx.setStorage({
      key: 'userinfo',
      data: userinfo
    })
    if(this.data.username.length == 0 || this.data.password.length == 0){
     wx.showToast({
       title: '不能为空',
       icon: 'loading',
       duration: 2000
     })
    }else{
     
      wx.request({
        url: 'https://api.uestcsise.cn/newhelp/api/login',
        header: {
          "Content-Type": "application/json"
        },
        method: "POST",
        data: {
          "teacherId": that.username,
          "password": that.password
        },
        success: function (res) {
          if (res.data.success == true) {
            wx.setStorage({
              key: 'teacherId',
              data: that.username,
            })
            wx.setStorage({
              key: 'password',
              data: that.password,
            })
            var that2 =res.data
            console.log(that2.data)
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000
            })
            wx.setStorage({
              key: 'name',
              data: that2.data.name,
            })
            wx.setStorage({
              key: 'duty',
              data: that2.data.duty,
            })
            wx.setStorage({
              key: 'token',
              data: that2.data.token,
            })
            
            wx.switchTab({
              url: '../now/now'
            })
          }
          else {
            wx.showToast({
              title:"登录失败",
              icon:"fail"
            })
          }
        },
        fail: function (res) {
          console.log(res);
        }
      })
   }
     
     
 }

})