const express = require("express");
const User = require("../database");
const jwt = require("jsonwebtoken");
const z = require("zod");
const JWT_SECRET = require("../jwtconfig");
const bcrypt = require("bcrypt")
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const SignupAuth = z.object({
      username: z.string().email(),
      firstname: z.string().min(5).max(15),
      lastname: z.string().min(5).max(15),
      password: z.string().min(8),
    });

    const { success } = SignupAuth.safeParse(req.body);

    if (!success) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const userPresence = await User.findOne({
      username: req.body.username,
    });

    if (userPresence) {
      return res.status(409).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, salt);
    const user = await User.create({
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: securePassword,
    });

    const userId = user._id;
    const token = jwt.sign({ userId }, JWT_SECRET);

    res.status(200).json({
      message: "User created successfully",
      token,
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ message: "Internal server error", error: err });
  }
});

router.post("/signin", async(req, res)=>{
 
    const signinAuth = z.object({
      username:z.string(),
      password:z.string().min(8)
    })
   const {success} = signinAuth.safeParse(req.body)
    
   if(!success){
   return res.status(400).json({message:"check your credentials"})
   }
   const findingUser = await User.findOne({
     username:req.body.username,
     password: req.body.password
    })
    if(!findingUser){
      return res.status(401).json({message:"error while logging "})
    }
    const verifedPass = bcrypt.compare(req.body.password, findingUser.password)
    if(!verifedPass){
      return res.status(401).json({message:"password not correct"})
    }
    const userId = findingUser._id
    const token = jwt.sign({userId}, JWT_SECRET)
    res.status(200).json({
      message:"user signed successfully",
      token
    })
 
})

module.exports = router;
