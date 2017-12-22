interface responseProps{
  status?:number,
  msg?:string
  data:dataContent,
}
interface dataContent{
  item?:any,
  list?:Array<any>
}
/**
 * 返回客户端对象
 * 
 * @export
 * @class response
 */
export default class response{
  private status?:number
  private msg?:string
  private data:any

  constructor(props:responseProps){
    this.status = props.status || 200
    this.msg = props.msg || "success"
    this.data = props.data || {}
  }
}