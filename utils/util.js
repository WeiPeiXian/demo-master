const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//使用 var util = require('../../utils/util.js')
//使用 util.reload()
function reload(){
  var username,password;
  wx.getStorage({
    key: 'user',
    success: function (res) { 
      username = res.data.name,
      password = res.data.password
      wx.request({
        url: 'https://api.uestcsise.cn/newhelp/api/login',
        header: {
          "Content-Type": "application/json"
        },
        method: "POST",
        data: {
          "teacherId": username,
          "password": password
        },
        success: function (res) {
          if (res.data.success == true) {
            var that2 = res.data
            console.log(res.data)
            wx.showToast({
              title: '重新登录成功',
              icon: 'success',
              duration: 2000
            })
            wx.setStorage({
              key: 'token',
              data: that2.data.token,
            })
          }
          else {
            wx.showToast({
              title: "登录失败",
              icon: "fail"
            })
          }
        },
        fail: function (res) {
          console.log(res);
        }
      })
    },
    
  })
  
}
module.exports = {
  formatTime: formatTime,
  reload: reload

}
