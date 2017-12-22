import * as mongoose from 'mongoose'
// let DB_PATH='mongodb://memo:memo@47.104.7.232:27017/memo'
let DB_PATH='mongodb://memo:memo@127.0.0.1:27017/memo'
mongoose.connect(DB_PATH,{
  reconnectTries: 30,
  useMongoClient:true
})
const connection = mongoose.connection

connection.on('open',()=>{
  console.log(`mongodb is connected`)
})
connection.on('error',(e)=>{
  console.log(`mongodb is error ${e}`)
})
export default mongoose