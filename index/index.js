var app = getApp()
Page({
  data: {
    tempFilePaths: '',
    base:''
  },
  onLoad: function () {
  },
 
  chooseimage: function () {
     var _this=this 
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) { 
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        _this.setData({
          tempFilePaths: res.tempFilePaths,
          base:wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], 'base64')
        })
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            console.log('data:image/jpg;base64,' + res.data)
          }
        })
        //let base64 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], 'base64') 
        //console.log(base64)
       
      }
    })
  },
 

  search:function(){
    var _this = this
    
    wx.request({
      //动物识别
      url: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/animal?access_token=24.8ec2d55b282028dc962210f3a741bff3.2592000.1547712301.282335-14808093',
      data: { 
        image: '' + _this.data.base//传输的一定要为图片的base64编码
      },
      method: 'POST',//传输方式为POST，不是GET
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },

      success: function (res) {
        console.log(res)
        var text="";
        text=res.data.result[0].name
        _this.setData({
          name:text
        })
        //访问维基百科获取文本
        wx.request({
          url: 'https://zh.wikipedia.org/w/api.php?action=opensearch&search=' + text + '&limit=1&namespace=0&format=json',//具体方式可访问https://zh.wikipedia.org/w/api.php?获取wikiapi的使用方法

          method: 'GET',
          header: {
            "content-type": "application/json",
          },

          success: function (res) {
            console.log(res.data[2])
          var text1=res.data[2]
          _this.setData({
            name1:text1
          })
          }
        })
      },
      fail: function () {
      },
      complete: function () {
      }
    })
  },

  search1: function () {
    var _this = this
    wx.request({
      //植物识别
      url: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/plant?access_token=24.8ec2d55b282028dc962210f3a741bff3.2592000.1547712301.282335-14808093',
      data: {
        image: '' + _this.data.base//传输的一定要为图片的base64编码
      },
      method: 'POST',//传输方式为POST，不是GET
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },

      success: function (res) {
        console.log(res)
        var text = "";
        text = res.data.result[0].name
        _this.setData({
          name: text
        })
        
        //访问维基百科获取文本
        wx.request({
          url: 'https://zh.wikipedia.org/w/api.php?action=opensearch&search=' + text + '&limit=1&namespace=0&format=json',//具体方式可访问https://zh.wikipedia.org/w/api.php?获取wikiapi的使用方法

          method: 'GET',
          header: {
            "content-type": "application/json",
          },

          success: function (res) {
            console.log(res.data[2])
            var text1 = res.data[2]
            _this.setData({
              name1: text1
            })
            
          }
        })
      },
      fail: function () {
      },
      complete: function () {
      }
    })
  }
})

//获取细粒度图片识别token
wx.request({
  url: "https://aip.baidubce.com/oauth/2.0/token",
  data: {
    grant_type: "client_credentials",
    client_id: "1LWXG6gjIVjhTdiyBLQHxYxw",//apikey
    client_secret: "4uMcglyqv0eKepOFDMMqzXBvDWkGvmXo"//apisecret
  },
  header: {
    "content-type": "application/x-www-form-urlencoded"
  },
  success: function (res) {
    console.log(res.data)//打印出的access_token=""即为token
  }
})


