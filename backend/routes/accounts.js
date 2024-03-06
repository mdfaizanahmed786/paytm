const  mongoose  = require('mongoose');
const express = require("express")
const {Accounts} = require("../database")
const authenticateMiddleware = require("../middleware")
const router = express.Router()
router.get("/balance", authenticateMiddleware, async(req, res)=>{
   
  const accountInfo = await Accounts.findOne({userId : req.userId})
 // console.log(userId)
  res.json({
    balance:accountInfo.balance
  })
})

router.post("/transfer", authenticateMiddleware, async(req,res)=>{
    const session = await mongoose.startSession()
     session.startTransaction();
    const {amount, to} = req.body
    // fetch the amount from the user 
    const user = await Accounts.findOne({userId: req.userId}).session(session)
    if(!amount || user.balance<amount){
        await session.abortTransaction()
        return res.status(400).json({
            message:"Insufficient Funds"
        })
    }
    try{
        const toTransfer = await Accounts.findOne({userId: to}).session(session)
        if(!toTransfer){
            await session.abortTransaction()
            return res.status(400).json({
                message:"No user found with that ID"
            })
        }
        await Accounts.updateOne({userId: req.userId}, {$inc:{balance:-amount}}).session(session)
        await Accounts.updateOne({userId:to}, {$inc:{balance:amount}}).session(session)
    
        await session.commitTransaction()
        res.status(200).json({
            message:"The Transaction was successful"
        })

    } catch(error) {
        res.status(400).json({
            message:"there was a error"
        })
        console.log(error)
    }
})
module.exports = router