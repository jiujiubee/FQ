Page({
  data: {
    classList: undefined,
    checkList: []
  },
  onLoad: function(){
    const app = getApp()
    wx.cloud.callFunction({
      name:"classToday",
      success: res => {      
        this.setData({
        'classList': res.result.list
        })   
      },
      fail: err => {
        console.error('获取今日课程失败：', err)
      },
      complete: res =>{  
        if(this.data.classList != null){
          var temp = new Array() 
          for (const item of this.data.classList) {
            temp.push(item._id)   
          }
          wx.cloud.callFunction({
            name: "checkEnroll",
            data: {
              classIdList: temp
            },
            success: res =>{
              var myInfo =  res.result.list
              var checkList = new Array()
              for (const item of this.data.classList) {
                checkList.push(myInfo.find(info => info.classid === item._id))
              }       
              this.setData({
                'checkList': checkList
              })
              // console.log(this.data.checkList)
            },
            fail: err => {
              console.error('checkEnroll 失败', err)
            }
          })
        }      
    }}) 
        
      
  },

  checkIn: function (event){
    var that = this
    console.log(event.currentTarget.dataset.classId)
    wx.cloud.callFunction({
      name:"checkIn",
      data:{
        classId:  event.currentTarget.dataset.classId
      },
      success: res => {             
        wx.showToast({
          title: '签到完成',
          icon: 'none'
        }) 
        that.onLoad()
      },
      fail: err => {
        console.error('checkIn失败：', err)
      },
    })
  },

  showChecked: function (res){
    wx.showToast({
      title: '已经签到过了',
      icon: 'none'
    }) 
  },
  
  onReady: function () {
    

  },
})
