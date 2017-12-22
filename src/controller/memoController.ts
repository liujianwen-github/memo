import memoData from '../dao/memoaction'
import { Response, Request } from 'express-serve-static-core';
import * as url from 'url'
import * as queryString from 'querystring'
import ResObj from './reponse'
import * as multiparty from 'multiparty'
import * as fs from 'fs'
import { Error } from 'mongoose';
import {encode} from '../util/base64'
import * as path from 'path'

export default{
  /**
   * 直接调用了dao层
   * 
   */
  addInfo(req:Request,res:Response){
    // console.log(memoData.add(data))
    let form = new multiparty.Form({
      encoding :'utf-8',
      // uploadDir : "/var/www/html/images/",
      // uploadDir : __dirname+"/../../images/"
    })
    form.parse(req,(err,fields,files)=>{         
      if(err){
          console.log(err);
          // var u={"error" :1,"message":'请上传5M以图片'};
          // res.end(JSON.stringify(u));
          return false;
        }
      let suffix='' //文件格式
      let insertData = fields
      insertData.imgs = []
      for(let i in files.img){
        let oldpath=files.img[i]['path'] 
        console.log(typeof oldpath)
        if(files){
          suffix=oldpath.split('.')[1]
        }else{
          var u={"error" :1,"message":'请上传正确格式'};
          res.end(JSON.stringify(u));
          return false;
        }
        let fileData = fs.readFileSync(oldpath)
        var url = `memo_${new Date().getTime()}'_'${+i}.${suffix}`
        let savePath = path.join('/var/www/html/images/',url)
        fs.writeFileSync(savePath,fileData)
        insertData.imgs.push(`://47.104.7.232/images/${url}`)
      }
      memoData.add(insertData).then((e)=>{
          res.send(new ResObj({
            msg:"添加成功",
            data:{}
          }))
        }).catch((err)=>{
          console.log(`error:${err}`)
          res.send(new ResObj({
            status:410,
            msg:err,
            data:{}
          }))
          throw new Error("添加数据失败")      
        })
    })
    
  },
  deleteInfo(req:Request,res:Response){
    let id = req.body.id
    memoData.findById({id:id},(err:any,succ:any)=>{
      if(err){
        res.send(new ResObj({
          status:410,
          msg:"当前id对应的笔记不存在，请检查参数",
          data:{}
        })) 
        throw new Error('查询参数不存在错误')  
      }else{
        memoData.deleteItem(id,(err:any)=>{
          if(err){
            res.send(new ResObj({
              status:500,
              msg:"数据库出错",
              data:{}
            }))
            throw new Error('删除数据错误')  
          }else{
            res.send(new ResObj({
              msg:"删除成功",
              data:{}
            }))
          }
        })
      }
    })

  },
  updateInfo(req:Request,res:Response){
    console.log(req.body)
    let data = req.body
    if(typeof data.updateTime ==='undefined') data.updateTime=new Date().getTime()
    memoData.updateMemo(data,(err:any,raw:any)=>{
      if(err){
        res.send(new ResObj({
          status:410,
          msg:err,
          data:{}
        }))
        throw new Error("更新文档失败")
      }else{
        res.send(new ResObj({
          msg:"更新成功",
          data:{}
        }))
      }
    })
  },
  getInfo(req:Request,res:Response){
    let arg:any = url.parse(req.url,true).query
    console.log(arg.id)
    if(arg.id){
      memoData.findById(arg,(err:any,data:any)=>{
        if(err){
          res.send(new ResObj({
            status:410,
            msg:"当前id对应的笔记不存在",
            data:{}
          }))
          throw new Error('获取笔记错误')  
        }else{
          console.log(data)
          res.send(new ResObj({
            data:{
              item:data
            }
          }))
        }
      })
    }
  },
  getAll(res:Response){
   memoData.getAll((err:any,memos:any)=>{
     if(err){
       res.send(new ResObj({
         status:410,
         msg:"参数错误",
         data:{}
       }))
       throw new Error('单条查询错误')       
     }else{
       res.send(new ResObj({
         data:{
           list:memos
         }
       }))
     }
   })
  },
  converCollectedStatus(req:Request,res:Response){
    let data= req.body
    memoData.convertCollectStatus(data,(err:any,raw:any)=>{
      if(err){
        res.send(new ResObj({
          status:410,
          msg:err,
          data:{}
        }))
        throw new Error("收藏失败")
      }else{
        res.send(new ResObj({
          msg:"收藏成功",
          data:{}
        }))
      }
    })
  }
}
// export default Memo