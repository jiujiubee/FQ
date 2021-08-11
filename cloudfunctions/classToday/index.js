const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate
//获取当前时间把 Date 对象的日期部分转换为字符串"2020/8/4"
var today = new Date().toLocaleDateString()

exports.main = async (event, context) => {
  const result = await db.collection("Classes")
  .aggregate()
  .match({
    date:_.and(_.gte(new Date(today+" 00:00:00")),_.lte(new Date(today+" 23:59:59")))
  })
  .project({
    _id : 1,
    course : 1,
    class : 1,
    date: $.dateToString({
      date: '$date',
      format: '%H:%M'
    })
  })
  .end()
  return result
}