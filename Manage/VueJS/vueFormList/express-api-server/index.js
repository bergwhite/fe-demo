const express = require('express')
const app = express()
const cors = require('cors')
const mock = require('./static/mock.json')
const port = 9999

app.use(cors())

// 接管/路由
app.get('/api/book', (req, res) => {
  res.json(mock)
})

// 监听端口
app.listen(port, () => {
  console.log(`Listend on localhost: ${port}`)
})