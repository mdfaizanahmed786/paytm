const RouterMiddleware = require("./routes/index")
const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json()); 
app.use("/api/v1/", RouterMiddleware)
app.listen(3001, ()=>{
    console.log('server is running in port 3001')
})