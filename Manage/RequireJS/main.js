// 设置模块所在的目录

requirejs.config({
  baseUrl: 'module'
})

// 调用模块

require(['myName','yourName'],function (myName,yourName) {
  document.write(myName+'<br>')
  document.write(yourName)
})