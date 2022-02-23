const express = require('express')
const _PORT = 7030
const app = express()

app.use(express.urlencoded({extended:true}))

app.listen(_PORT,()=>{
    console.log(`Server running on ${_PORT}!`)
})
