const express = require("express");
const {User} = require("../database");
const {Accounts} = require("../database")
const jwt = require("jsonwebtoken");
const z = require("zod");
const JWT_SECRET = require("../jwtconfig");
const middleWare = require("../middleware")
const bcrypt = require("bcrypt")
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const SignupAuth = z.object({
      username: z.string().email(),
      firstname: z.string().min(3),
      lastname: z.string().min(3),
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
    //---------CREATE A ACCOUNT OF A USER---------
      await Accounts.create({
        userId,
        balance: 1 + Math.random() * 10000
      })
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

router.post("/signin", async (req, res) => {
  const signinAuth = z.object({
    password: z.string().min(8),
    username: z.string(),
  });

  const { success } = signinAuth.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ message: "Check your credentials" });
  }

  try {
    const findingUser = await User.findOne({ username: req.body.username });

    if (!findingUser) {
      return res.status(401).json({ message: "Error while logging in" });
    }

    const verifiedPass = await bcrypt.compare(req.body.password, findingUser.password);

    if (!verifiedPass) {
      return res.status(401).json({ message: "Password not correct" });
    }

    const userId = findingUser._id;
    const userName = findingUser.firstname
    const token = jwt.sign({ userId }, JWT_SECRET);

    res.status(200).json({
      message: "User signed in successfully",
      token,
      userName
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ message: "Internal server error", error: err });
  }
});
router.get("/allusers", async(req, res)=>{
   const users = await User.find({})
   res.json({
    users
   })
})
router.put("/", middleWare, async(req, res)=>{
  const updatingValidation = z.object({
    firstname:z.string().min(5).optional(),
    lastname:z.string().min(5).optional(),
    password:z.string().min(8).optional()
  })
  const { success } = updatingValidation.safeParse(req.body)
  if(!success){
    return res.status(400).json({message:"please enter correct credentials"})
  } 
  if(req.body.password){
    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedpass
  }
    await User.updateOne({_id:req.userId}, req.body);
       
   res.status(200).json({msg:"the user updated successfully"})
   //console.log(req.userId, req.body)

})
router.get("/bulk", async(req, res)=>{
  const filter = req.query.filter || "";

  const users = await User.find({
      $or: [{
          firstname: {
              "$regex": filter
          }
      }, {
          lastname: {
              "$regex": filter
          }
      }]
  })

  res.json({
      user: users.map(user => ({
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          _id: user._id
      }))
  })
})
module.exports = router;
