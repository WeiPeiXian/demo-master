var app=getApp();
Page({
  data: {
    username: '',
    password: ''
  },
 phoneInput :function(e){
   var that=this;
   wx.getStorage({
     key: 'teacherId',
     success: function (res) {
       that.setData({
         username: res.data
       })
     },
   })
   that.setData({
     username: e.detail.value
   })
 },

 passwordInput :function(e){
   var that=this
   wx.getStorage({
     key: 'password',
     success: function (res) {
       that.setData({
         username: res.data
       })
     },
   })
   that.setData({
     password: e.detail.value
   })
 },

 login: function(){
    var that = this.data
    if(this.data.username.length == 0 || this.data.password.length == 0){
     wx.showToast({
       title: '不能为空',
       icon: 'loading',
       duration: 2000
     })
    }else{
      wx.request({
        
        url: 'http://180.76.249.233:8080/newhelp/api/login',
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
            wx.setStorage({
              key: 'teacherId',
              data: that.username,
            })
            wx.setStorage({
              key: 'password',
              data: that.password,
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