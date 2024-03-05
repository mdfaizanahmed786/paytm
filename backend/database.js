const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://riyanahmed1703:9c646A4LlMccuBuv@cluster0.hwgmfkm.mongodb.net/')


const UserSchema = new mongoose.Schema({
    username:{
      type:String,
      unique:true
    },
    firstname:String,
    lastname:String,
    password:{
        type:String
    }
})

const User = mongoose.model('Users', UserSchema)

module.exports = User