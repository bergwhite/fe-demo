const jwt = require('jsonwebtoken');
const express = require('express')
const app = express()
const port = 9999

// 密钥
const pubKey = 'secr'

// JWT加密
function jwtEnc(name) {
  const token = jwt.sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) + (60 * 60) }, pubKey)
  return token
}

// JWT解密
// 返回Promise对象
function jwtDec(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, pubKey, function(err, val){
      // 捕获到错误则拒绝
      if (err) {
        reject('Tooken is invaild')
      }
      // 否则返回处理成功
      else {
        resolve(val)
      }
    })
  })
}

// 把public目录作为静态目录
app.use(express.static(__dirname + '/public'))

// JWT认证接口
app.get('/api/login', (req, res) => {
  const myJwt = jwtEnc('hello')
  res.json({token: myJwt})
})

// JWT认证测试
app.get('/api/test', (req, res) => {
  if (req.query.token) {
    const token = req.query.token
    jwtDec(token).then((val) => {
      console.log(val)
      res.json(val)
    })
    .catch((err) => {
      res.json({sta: 'error',msg: err})
    })
  }
  else {
    res.json({sta: 'error',msg: 'Please request with token.'})
  }
});

// 接管/路由
app.get('/', (req, res) => {
  res.send('<h1>HELLO WORLD</h1>')
})

// JWT认证错误处理
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
});

// 监听端口
app.listen(port, () => {
  console.log(`Listend on localhost: ${port}`)
})