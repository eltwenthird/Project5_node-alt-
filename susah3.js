const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")
const moment = require("moment")

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

app.post("/pelanggaran_siswa", (req,res)=>{
    let data = {
        id_siswa: req.body.id_siswa,
        id_user: req.body.id_user,
        waktu: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    let pelanggaran = JSON.parse(req.body.pelanggaran)

    let sql = "insert into pelanggaran_siswa set ?"

    tb.query(sql, data, (error, result)=>{
        let response = null

        if (error) {
            res.json({message:error.message})
        }else{
            let lastID = result.insertId

            let data = []
            for (let index = 0; index < pelanggaran.length; index++) {
                data.push([
                    lastID, pelanggaran[index].id_pelanggaran
                ])
            }
            
            let sql = "insert into detail_pelanggaran_siswa values ?"

            tb.query(sql,[data], (error, result)=>{
                if (error) {
                    res.json({message: error.message})
                }else{
                    res.json({message: " Data has been inserted"})
                }
            })
        }
    })
})



app.listen(3500,()=>{
    console.log=("run on port 3500")
})
