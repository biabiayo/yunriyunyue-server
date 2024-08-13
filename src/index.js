//主文件，引用各个文件，拦截请求，后端路由
// # 用express创建一个app对象，在本地3000端口运行一个http服务，开通一个 / 根路由的节点。
// # 本示是express官网示例，具体看express官网解释。
import express from 'express'
// const router = require('./router/index.js')
const app = express()
import "./router/index.js"
app.use(router)

// app.get('/', (req, res) => {
//   console.log('req', req);
//   console.log('res', res);
//   res.send('Hello nodeman11!')
// })

// //轮播图 bannerList
// app.get('/bannerList', (req, res) => {
//   res.send(All_Data.bannerList)
//   console.log('========', All_Data.bannerList);
// })

app.listen(3000, () => {
  console.log(`云日云曰 ${3000}`)
})