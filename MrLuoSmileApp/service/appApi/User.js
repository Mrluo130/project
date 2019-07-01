const Router = require ('koa-router')
const mongoose=require('mongoose')

let router = new Router()
router.post('/register',async(ctx)=>{
    //取得Model
    const User = mongoose.model('user')
    // console.log(ctx.body)
    //把从前端接收的POST数据封装成一个新的user对象
    let newUser = new User(ctx.request.body)
    //用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
    await newUser.save().then(()=>{
        //成功返回code=200，并返回成功信息
        ctx.body={
            code:200,
            message:'注册成功'
        }
    }).catch(error=>{
         //失败返回code=500，并返回错误信息
        ctx.body={
            code:500,
            message:error
        }
    })
   
})

//登陆接口
router.post('/login',async(ctx)=>{
  //得到前端传过来的数据
  let  loginUser= ctx.request.body
  let userName=loginUser.userName
  let password = loginUser.password
  //引入User的model
  const User =mongoose.model("user")
  //查找用户名是否存在
await User.findOne({userName:userName}).exec().then(async(result)=>{
    if (result) {
        //当用户名存在时，开始对比密码
        let newUser=new User()
        await newUser .comparePassword(password,result.password).then((isMatch)=>{
            //返回对比结果
            ctx.body={
                code:200,
                message:isMatch
            }
        }).catch(error=>{
            ctx.body={
                code:200,
                message:error
            }
        })
    }else{
        ctx.body={
                code:200,
                message:'用户名不存在'
        }
    }
}).catch(error=>{
    ctx.body={
        code:200,
        message:'error'
}
})
})
module.exports=router;