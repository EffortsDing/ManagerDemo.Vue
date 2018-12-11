export default {
  // cookie
  setCookie (cName, cPwd, exdays, remeberFlag) {
    var exdate = new Date() // 获取时间

    exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays) // 保存的天数

    // 字符串拼接cookie

    window.document.cookie =
      'userName' + '=' + cName + ';path=/;expires=' + exdate.toGMTString()

    window.document.cookie =
      'userPwd' + '=' + cPwd + ';path=/;expires=' + exdate.toGMTString()

    window.document.cookie =
      'remeberFlag' +
      '=' +
      remeberFlag +
      ';path=/;expires=' +
      exdate.toGMTString()
  },
  // 获取cookie对应flag的值
  getCookies: function (flag) {
    var search = flag + '='

    if (document.cookie.length > 0) {
      var a = document.cookie.indexOf(search)

      if (a !== -1) {
        a += search.length

        var end = document.cookie.indexOf(';', a)

        if (end === -1) {
          end = document.cookie.length

          return unescape(document.cookie.substring(a, end))
        }
      }
    }
  },
  getCookie: function () {
    if (document.cookie.length > 0) {
      var arr = document.cookie.split('; ') // 这里显示的格式需要切割一下自己可输出看下

      for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('=') // 再次切割

        // 判断查找相对应的值

        if (arr2[0] === 'userName') {
          var usernameSpan = document.getElementById('usernameSpan')

          usernameSpan.innerText = arr2[1] // 保存到保存数据的地方
        } else if (arr2[0] === 'remeberFlag') {
          this.remeberFlag = arr2[1]

          console.log(this.remeberFlag)
        }
      }
    }
  },
  clearCookie: function () {
    this.setCookie('', '', -1, '')
  }
}
