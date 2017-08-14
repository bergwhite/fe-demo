const express = require('express')
const router = express.Router()
const app = express()
const port = 9999

// 没有请求都会在控制台添加一条记录
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} ${req.ip}`);
  next();
});

// 接管/路由
router.get('/', (req, res, next) => {
  res.send('<h1>HELLO WORLD</h1>')
})

// 使用路由
app.use(router)

// 捕获错误
app.use((req, res, next) => {
  const err = new Error('<h1>Not Found</h1>');
  err.status = 404;
  next(err);
});

// 错误处理
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send('<h1>404 Not Found</h1>')
  }
});

// 监听端口
app.listen(port, () => {
  console.log(`Listend on localhost: ${port}`)
})