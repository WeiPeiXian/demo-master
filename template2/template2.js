
//初始化数据
function tabbarinit() {
 return [
    {
        "current": 0,
        "pagePath": "/pages/record/record",
        "iconPath": "/imgs/home.png",
        "selectedIconPath": "/imgs/home_on.png",
        "text": "记录"
      },
      {
        "current": 0,
        "pagePath": "/pages/stu/stu",
        "iconPath": "/imgs/message.png",
        "selectedIconPath": "/imgs/message_on.png",
        "text": "个人信息"
      }
    ]

}

/**
 * tabbar主入口
 * @param  {String} bindName 
 * @param  {[type]} id       [表示第几个tabbar，以0开始]
 * @param  {[type]} target   [当前对象]
 */
function tabbarmain(bindName = "tabdata", id, target) {
  var that = target;
  var bindData = {};
  var otabbar = tabbarinit();
  otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']//换当前的icon
  otabbar[id]['current'] = 1;
  bindData[bindName] = otabbar
  that.setData({ bindData });
  wx.setStorage({
    key: 'back',
    data: false,
  })
}


module.exports = {
  tabbar: tabbarmain
}