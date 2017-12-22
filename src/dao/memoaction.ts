// import * as mongoose from 'mongoose'
import mongo from './memo'
var t1=new Date().getTime()
const memoSchema = new mongo.Schema({
  title:{type:String},
  content:{type:String,default:"没有内容"},
  createTime:{type:Number},
  updateTime:{type:Number}
})
let memoModel = mongo.model('memos',memoSchema)
export default{
  /**
   * 添加一条数据
   * 
   * @param {*} data 
   * @returns Promise对象
   */
  add(data:any){
    console.log(`准备添加数据:${JSON.stringify(data)}`)
    if(typeof data.createTime==='undefined'){
      data.createTime = new Date().getTime()
    }
    console.log(typeof data.createTime)
    let model = new memoModel(data)
    console.log(model)
    console.log(model.save(data))
    return model.save(data) //promise
  },
  /**
   * 获取全部数据
   * 
   * @param {*} callback 
   */
  getAll(callback:any){
    memoModel.find({},callback)
  },
  /**
   * 按id查询
   * 
   * @param {{id:String}} data 
   * @param {*} callback 
   */
  findById(data:{id:String},callback:any){
    console.log(data.id)
    memoModel.findById({_id:data.id},callback)
  },
  /**
   * 根据id更新一条文档
   * 
   * @param {{id:string,content:string}} data 
   * @param {Function} callback 
   */
  updateMemo(data:{id:string,content:string,updateTime:Number},callback:Function){
    memoModel.update({_id:data.id},{content:data.content,updateTime:data.updateTime},{multi:true},callback)
  },
  deleteItem(id:string,callback:Function){
    memoModel.remove({_id:id},callback)
  }
}