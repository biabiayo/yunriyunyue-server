//主文件，引用各个文件，拦截请求，后端路由
// # 用express创建一个app对象，在本地3000端口运行一个http服务，开通一个 / 根路由的节点。
// # 本示是express官网示例，具体看express官网解释。

const express = require('express')
const app = express()
const port = 3000
const apiRouter = express.Router()

app.get('/', (req, res) => {
  console.log('req', req);
  console.log('res', res);
  res.send('Hello nodeman11!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

moudle.exports = apiRouter
