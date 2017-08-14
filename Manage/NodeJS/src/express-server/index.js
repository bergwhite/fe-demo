const express = require('express')
const app = express()
const port = 9999

// 接管/路由
app.get('/', (req, res) => {
  res.send('<h1>HELLO WORLD</h1>')
})

// 监听端口
app.listen(port, () => {
  console.log(`Listend on localhost: ${port}`)
})