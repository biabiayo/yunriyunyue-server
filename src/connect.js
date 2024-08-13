// 链接数据库前端等相关操作
import express from 'express'
const port = 3000
const mysql = require('mysql')
const app = express()
const router = express.Router();
const cors = require('cors');  // 跨域
// 引入express-session模块并设置中间件，做登录验证等需要操作session和cookie需要引入的模块
const session = require("express-session");
const cookieParser = require("cookie-parser")
app.use(cors());
// 解析参数
const bodyParser = require('body-parser')
// json请求
app.use(express.json())
// 表单请求
app.use(express.urlencoded({ extended: false }))
// 设置session和cookie配置项
app.use(cookieParser());
app.use(
  session({
    secret: 'keyboard cat',  // 服务端生成申明可随意写
    resave: true,      // 强制保存session即使他没有什么变化
    saveUninitialized: true,   // 强制将来初始化的session存储
    cookie: {  // session是基于cookie的，所以可以在配置session的时候配置cookie
      maxAge: 1000 * 60 * 30,  // 设置过期时间
      secure: false      // true的话表示只有https协议才能访问cookie
    }
  }))
/**
 * 配置mysql
 */
const option = {
  host: 'localhost',
  user: '*****',
  password: '*****',
  port: '3000',
  database: '*****',
  connectTimeout: 5000, //连接超时
  multipleStatements: false //是否允许一个query中包含多条sql语句
}

/**
 * 设置请求头，解决跨域
 */
var allowCors = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin); // 设置允许来自哪里的跨域请求访问（req.headers.origin为当前访问来源的域名与端口）
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS"); // 设置允许接收的请求类型
  res.header("Access-Control-Allow-Headers", "Content-Type,request-origin"); // 设置请求头中允许携带的参数
  res.header("Access-Control-Allow-Credentials", "true"); // 允许客户端携带证书式访问。保持跨域请求中的Cookie。注意：此处设true时，Access-Control-Allow-Origin的值不能为 '*'
  res.header("Access-control-max-age", 1000); // 设置请求通过预检后多少时间内不再检验，减少预请求发送次数
  next();
};
app.use(allowCors);
let pool;
repool()

// 处理接口返回数据，规范返回格式
function Res ({ code = 200, msg = '', data = {} }) {
  this.code = code;
  this.msg = msg;
  this.data = data;
}
function resJson (_res, result) {
  if (result) {
    return _res.json(new Res(result))
  } else {
    return
  }

}
// 断线重连机制
function repool () {
  // 创建连接池
  pool = mysql.createPool({  // 创建连接池
    ...option,
    waitForConnections: true,   // 当无连接池可用时，等待（true）还是抛错（false）
    connectionLimit: 100,   // 连接数限制
    queueLimit: 0      // 最大连接等待数（0为不限制）
  })
  pool.on('error', err => {
    err.code === 'PROTOCOL_CONNECTION_LOST' && setTimeout(repool, 2000)
  })
  app.all('*', (_, __, next) => {
    pool.getConnection(err => {
      err && setTimeout(repool, 2000) || next()
    })
  })
}
module.exports = { app, pool, router, resJson }

