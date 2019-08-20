// pages/todos-add/todos-add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textareaOldVal: "",
    textareaVal: "",
    test: ""
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
    let isEdit = false,
      editIndex = wx.getStorageSync("editIndex"),
      that = this;
    editIndex === false ? isEdit = false : isEdit = true;
    if (isEdit) {
      var editContent = wx.getStorageSync("todos")[editIndex];
      that.setData({
        textareaVal: editContent,
        textareaOldVal: editContent
      })
      console.log(that.data)
    }

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
  
  getAddContent(e){ // 输入时获取已经输入的内容
    this.setData({
      textareaVal: e.detail.value
    })
    console.log(this.data.textareaVal)
  },
  bindViewTap(e) { // 点击"保存"
    let storageIndex = wx.getStorageSync("editIndex");
    console.log(this.data.textareaVal, this.data.textareaOldVal)
    if (this.data.textareaVal == this.data.textareaOldVal){
      wx.showToast({
        icon: "none",
        title: '数据没有改变,无需保存',
      })
      return false;
    }
    let todos = wx.getStorageSync("todos") || [];
    if (storageIndex !== false){
      todos[storageIndex] = this.data.textareaVal;
    } else {
      todos.push(this.data.textareaVal)
    }
    wx.setStorageSync("todos", todos)
    wx.navigateBack({
      delta: 1,
      success: function (e) {
        var page = getCurrentPages().pop();// 前一个页面 
        console.log(page)
        if (page == undefined || page == null) return;
        page.onLoad();
      }
    });
  }
})