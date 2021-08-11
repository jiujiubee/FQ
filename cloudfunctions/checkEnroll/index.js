// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const { OPENID } = cloud.getWXContext()
  const _ = db.command
  const result = await db.collection("StudentInfo").aggregate()
  .match({
    classid: _.in(event.classIdList),
    openid: _.eq(OPENID)
  })
  .end()
  return result
}