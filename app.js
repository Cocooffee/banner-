const Koa=require('koa')
let app=new Koa()

const router=require('koa-router')();
const bodyparser=require('koa-bodyparser');

const query=require("./db/query") //引用公共模块

app.use(bodyparser())//解决post传参

app.use(router.routes())//运用 路由
app.use(router.allowedMethods())


router.get('/api/big',async ctx => {  //通过get接口
    let data = await query('select * from banner');
    ctx.body = data;//打印出来
})

router.post('/api/addd',async ctx=>{
    let {product,remark,relation} =ctx.request.body


    if(product&&remark&&relation){
        let user=await query('select * from banner where idcard=?',[product])//通过查找id
        if(user.data.length){
            ctx.code={
                code:0,
                msg:"人已经存在"
            }
        }else{
            var new_time=new Date()//获取当前时间
            try{
                await query('insert into banner (product,remark,relation,creation_tiem) values(?,?,?,?,?)',[username,bz,lx,new_time])
                ctx.body={
                    code:1,
                    msg:"添加成功"
                }
             }catch(e){
                ctx.body={
                    code:0,
                    msg:e
                }
             }
        }
    }else{
        ctx.body={
            code:2,
            msg:"信息缺失"
        }
    }

})


router.get('/api/del',async ctx => {
    let {id} = ctx.query;
    if(id || id === 0){
        try{
            await query('delete from banner where id=?',[id])
            ctx.body = {
                code:1,
                msg:'删除成功'
            }
        }catch(e){
            ctx.body = {
                code:0,
                msg:e
            }
        }
    }else{
        ctx.body = {
            code:2,
            msg:'参数缺失'
        }
    }
})


router.post('/api/edit',async ctx => {
    let {product,remark,relation,id} =ctx.request.body

    var new_time=new Date()
    if(id && username && password && idcard){
        try{
            let new_time = new Date();
            await query('update userlist set product=?,remark=?,relation=?,creation_time=? where id=?',[product,remark,relation,new_time,id])
            ctx.body = {
                code:1,
                msg:'修改成功'
            }
        }catch(e){
            ctx.body = {
                code:0,
                msg:e
            }
        }
    }else{
        ctx.body = {
            code:2,
            msg:'参数缺失'
        }
    }
})

process.env.PORT=8080

app.listen(process.env.PORT||3000,()=>{
    console.log('服务启动成功')
})