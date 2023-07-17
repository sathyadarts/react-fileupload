const express=require('express')
const cors=require('cors')
const multer=require('multer')
const mysql=require('mysql')
const bodyParser= require('body-parser')

const app=express()
app.use(express.json())
app.use(express.json())
app.use(cors())


app.listen(3000)

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')

    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }

})

const con=mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password:'',
   database:'mern1'

})
con.connect(function(err,con){
   if(err){
       console.log("con't connection")
   }
   else{
       console.log("connection successfilly")
   }
})

const upload=multer({storage:storage})

app.post('/upload',upload.single("file"),async (req,res)=>{
    try{
        if(req.file){
            res.send({
                status:true,
                message:"File Successfully uploaded"
            })
            
        

            const file3=req.file.destination
            const file2=req.file.filename
            

          
            

            const sql="insert into file (name) values (?)"
            con.query(sql,[file3]+[file2], function(err, res){
                 if(err){
                    console.log("con't insert")
                 }
                 else{
                    console.log("insert success")
                 }
            })

        }else{
            res.send("File not found")
        }

    }catch(err){
        res.status(500).send(err)

    }

})