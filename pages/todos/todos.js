// pages/todos/todos.js

var moveXList = [0, 0],//X轴移动的距离
  that="";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    moveLeft: [0],
    randomNum: ['bg1']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    let todos = wx.getStorageSync("todos"),
      pars = this.getRandomNum();
    this.setData({
      list: todos,
      moveLeft: pars.moveLeft,
      randomNum: pars.bgs
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

  getRandomNum(){ // 生成随机数
    let bgs = [],
      moveLeft = [],
      length = wx.getStorageSync("todos").length;
    for (let i=0;i< length;i++){
      bgs.push("bg" + Math.floor(Math.random() * 7 + 1));
      moveLeft.push(0);
    }
    let pars= {}
    pars.bgs = bgs;
    pars.moveLeft = moveLeft;
    return pars
  },
  // bindViewTap(){ // 页面跳转,到添加待办事项
  //   wx.navigateTo({
  //     url: '../todos-add/todos-add'
  //   })
  // }

  // 左滑删除
　　/**
   * 轻触回收指定删除按钮
   */
  tapBackDelBtn: function (e) {
    var matIndex = e.currentTarget.id.split("listChild")[1];
    that.backDelBtn(matIndex)
  },
  /**
   * 收回弹出删除按钮
   * matIndex:skuBody下标
   * 如果不传表示全部收回
   */
  backDelBtn: function (matIndex) {
    if (!matIndex) {
      that.data.list.forEach(function (item, index) {
        that.data.moveLeft[index] = 0;
      })
    } else {
      that.data.moveLeft[matIndex] = 0;
    }
    that.setData({ list: that.data.list })
  },
  /**
   * bindtouchmove
   */
  touchMoveToDel: function (e) {
    if (e.touches.length != 1) { return }
    if (moveXList[1] == 0) {
      moveXList.shift()
      moveXList.push(e.touches[0].clientX)
      return
    }
    var matIndex = e.currentTarget.id.split("listChild")[1]
    var moveLeft = that.data.moveLeft[matIndex]
    if ((moveLeft <= 0) || (moveLeft > -64)) {//移动范围在 -64px~0之间
      var dis = moveXList[1] - moveXList[0]
      moveLeft = parseInt(moveLeft ? moveLeft : 0) + parseInt(dis)
      moveLeft = moveLeft < -64 ? -64 : moveLeft
      moveLeft = moveLeft > 0 ? 0 : moveLeft
      moveXList.shift()
      moveXList.push(e.touches[0].clientX)
      for (var i = 0; i < that.data.moveLeft.length; i++){
        if (that.data.moveLeft[i] == -64 && i != matIndex){
          that.data.moveLeft[i] = 0;
        }
      }
      that.data.moveLeft[matIndex] = moveLeft
      that.setData({ list: that.data.list , moveLeft: that.data.moveLeft})
    }

  },
  /**
  * bindtouchend
  */
  touchEndToDel: function (e) {
    var matIndex = e.currentTarget.id.split("listChild")[1]
    var moveLeft = that.data.moveLeft[matIndex]
    if (moveLeft < -32) {//移动超过一半的距离,弹出删除按钮
      that.data.moveLeft[matIndex] = -64
    } else {//小于一半的距离,收回
      that.data.moveLeft[matIndex] = 0
    }
    that.setData({ list: that.data.list })
  },
  /**
  * bindtouchstart
  */
  touchStartToDel: function (e) {
    moveXList = [0, 0]
  },
  removeSingle: function(e){ // 移除单条事件
    let storageAry = wx.getStorageSync("todos"),
      index = e.target.dataset.index;

    storageAry.splice(index, 1);
    this.setData({'list': storageAry})
    wx.setStorageSync("todos", storageAry)
  },
  add: function(){
    wx.setStorageSync("editIndex", false)
    wx.navigateTo({
      url: "../todos-add/todos-add",
    })
  },
  edit: function(e){ // 编辑待办事件
    let editIndex = e.target.dataset.editindex,
      that = this;
    wx.setStorage({
      key: 'editIndex',
      data: editIndex,
    })
    wx.navigateTo({
      url: '../todos-add/todos-add',
    })
  }
})