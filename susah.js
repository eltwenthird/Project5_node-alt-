const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const tb = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"pelanggaran_siswa"
})

tb.connect(error=>{
    if (error) {
        console.log(error.message)
    }else{
        console.log("berhasil")
    }
})

app.get("/siswa", (req, res) =>{

    let sql = "select * from siswa"

    tb.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        }else{
            response = {
                count: result.length,
                siswa: result
            }
        }
        res.json(response)
    })
})

app.get("/siswa/:id", (req,res) =>{
    let data = {
        id_siswa:req.params.id
    }
    let sql = "select * from siswa where ?"

    tb.query(sql, data, (error, result) =>{
        let response = null
        if (error) {
            response = {
                message: error.message
            }            
        }else{
            response = {
                count: result.length,
                siswa: result
            }
        }
        res.json(response)
    })
})

app.post("/siswa", (req, res) => {
    let data = {
        nis:req.body.nis,
        nama_siswa: req.body.nama_siswa,
        kelas:req.body.kelas,
        poin:req.body.poin
    }
    let sql = "insert into siswa set ?"

    tb.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        }else{
            response = {
                message: result.affectedRows+" data inserted"
            }
        }
        res.json(response)
    })
})

app.put("/siswa",(req,res)=>{
    
    let data=[
    {
        nis:req.body.nis,
        nama_siswa:req.body.nama_siswa,
        kelas:req.body.kelas,
        poin:req.body.poin
    },

    {
        id_siswa: req.body.id_siswa
    }
]
    
    let sql = "update siswa set ? where ?"
    tb.query(sql,data,(error,result)=>{
    let response = null
    if(error){
        response={
            message:error.message
        }
    }else{
        response = {
            message: result.affectedRows+" data updated"
        }
    }
    res.json(response)
 })
})

app.delete("/siswa/:id",(req,res)=>{
    let data = {
        id_siswa:req.params.id
    }

    let sql ="delete from siswa where ?"

    tb.query(sql,data,(error,result)=>{
        let response = null
        if(error){
            response = {
                message: error.message
            }
        }else{
            response={
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response)
    })
})

app.listen(4000,() => {
    console.log("Run on port 4000")
})