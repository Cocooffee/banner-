const mysql=require('mysql')

let connection=mysql.createConnection(
    {
        user:"root",
        password:"root",
        host:"localhost",
        database:"okgo",
        port:3306
    }
)
connection.connect((error)=>{
    if(error){
        console.log("链接失败")
    }else{
        console.log("链接成功")
    }
})

module.exports=connection