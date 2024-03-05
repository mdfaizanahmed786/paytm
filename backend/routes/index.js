const express = require("express")
const UserRoute = require("./user")
const router = express.Router()

router.use('/user', UserRoute)
//router.use("/transaction", Transcationroute)
module.exports = router