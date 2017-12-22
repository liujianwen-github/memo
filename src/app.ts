import * as express from 'express'
import * as bodyParser from 'body-parser'
import ResObj from './controller/reponse' 
import Memo from './controller/memoController'
const app=express()
app.use(bodyParser.json()) //application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.all('*',function(req,res,next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method == 'OPTIONS') {
    res.send(200); 
  } else {   
    next(); 
  } 
}) 
// 添加一条备忘录
app.post('/memo',(req,res)=>{
  Memo.addInfo(req,res)
})
// 查询所有备忘录
app.get('/memos',(req,res)=>{
  Memo.getAll(res)
})
// 单条查询
app.get('/memo',(req,res)=>{
  Memo.getInfo(req,res)
})
// 修改内容
app.put('/memo',(req,res)=>{
  Memo.updateInfo(req,res)
})
// 删除一条
app.delete('/memo',(req,res)=>{
  Memo.deleteInfo(req,res)
})
app.get('/test',(req,res)=>{
  let data= new ResObj({
    status:1,
    msg:"测试接口",
    data:{}
  })
  console.log(data)
  res.send(data)
})

let server = app.listen(process.env.PORT||3000,()=>{
  var host = server.address().address;
  var port = server.address().port;
  console.log(`Example app listening at http://${host}:${port}`);
})