const showToast = function (title){
    wx.showToast({
        title,
        icon: 'none',
        duration: 1500
    });
      
}

export{
    showToast
}