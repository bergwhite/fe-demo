// 导入html文件（热更新）
require('../../dist/index.html')
// 打包样式
require('./styles.css')
// 导入模块
const moduleA = require('./a')
const moduleB = require('./b')
// 使用模块
console.log(moduleA)
console.log(moduleB)