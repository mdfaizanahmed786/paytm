const express = require("express")
const UserRoute = require("./user")
const AccountsRoute = require("./accounts")
const router = express.Router()

router.use('/user', UserRoute)
router.use('/accounts', AccountsRoute)
module.exports = router