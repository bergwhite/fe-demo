## 环境功能

* 支持即时预览的开发方式
* 支持编译ES6到ES5并压缩代码
* 支持编译LESS到CSS并压缩代码
* 支持复制文件及目录到线上目录
* ...

## 环境优势

* 配置简单
* 即时预览，告别手动刷新
* 性能优化

## 使用步骤

**安装依赖**

```

npm instll

```

**配置文件**

```

gulpfile.js
--------------

// 编译后的文件存放目录
var siteDir = 'dest';
// 即使预览的规则
var siteReload = {
  css: 'src/css/*\.less',
  js: 'src/js/*\.js'
}
// 需要编译的文件目录
var compileDir = {
  css: {
    src: 'src/css/index.less',
    dest: 'dest/css'
  },
  js: {
    src: 'src/js/index.js',
    dest: 'dest/js'
  },
  copyApi: {
    src: 'src/api/*',
    dest: 'dest/api'
  },
  copyHTML: {
    src: 'src/index.html',
    dest: 'dest'
  }
};

```

## 开始使用

```

npm run build  // 只编译线上站点
npm run build  // 开启即使预览的开发模式

```