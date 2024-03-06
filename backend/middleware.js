const jwt = require("jsonwebtoken")
const JWT_SECRET = require("./jwtconfig")
const authenticateMiddleware = (req, res, next) => {
   const authHeaders = req.headers.authorization
   if(!authHeaders || !authHeaders.startsWith("Bearer ")){
    return res.status(400).json({message :"no token provided"})
   }
   try{
   const token = authHeaders.split(' ')[1];
   if(!token){
    return res.status(400).json({msg:"no token"})
   }
   const decodedToken = jwt.verify(token, JWT_SECRET)
   if(!decodedToken){
    return res.status(400).json({Message:"please provide a valid token"})
   }
   else{
       req.userId = decodedToken.userId
       next()
   }
} catch(error){
    res.json({message:"internal server error", error})
}
}
module.exports = authenticateMiddleware