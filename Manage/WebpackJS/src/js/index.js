// 导入html文件（热更新）
require('../../index.html');
// 打包样式
require('../css/styles.css');
// 导入模块
const moduleA = require('./a');
const moduleB = require('./b');
// 使用模块
console.log(moduleA);
console.log(moduleB);
