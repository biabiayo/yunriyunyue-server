// 放置接口文件（.js文件）

const { router } = require('../connect')
import * as  All_Data from '../db/data.js'

//轮播图 bannerList
router.get('/bannerList', (req, res) => {
  res.send(All_Data.bannerList)
  console.log('========', All_Data.bannerList);
})

//菜单 menuList
router.get('/menuList', (req, res) => {
  res.send(All_Data.menuList)
})

//系统通知 systemNotice
router.get('/systemNotice', (req, res) => {
  res.send(All_Data.systemNotice)
})

//热门特效 hotVFXList
router.get('/hotVFXList', (req, res) => {
  res.send(All_Data.hotVFXList)
})

//全部特效 allVFXList
router.get('/allVFXList', (req, res) => {
  res.send(All_Data.allVFXList)
})



module.exports = router;
