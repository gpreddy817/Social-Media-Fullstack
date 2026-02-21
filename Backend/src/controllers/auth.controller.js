const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");


async function registerController(req, res){
    const { username, email, password, bio, profileImage } = req.body;
  
    const isUserExists = await userModel.findOne({
      $or: [{ username }, { email }]
    });
  
    if (isUserExists) {
      return res.status(409).json({
        message:
          isUserExists.email === email
            ? "Email already exists"
            : "Username already exists"
      });
    }
  
    const hash = await bcrypt.hash(password, 10)
  
    const user = await userModel.create({
      username,
      email,
      bio,
      profileImage,
      password: hash
    });
  
    const token = jwt.sign(
      { id: user._id, 
        user: user.username 
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )
  
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,   // required for localhost (true only in HTTPS)
      sameSite: "lax", // required for cross-origin frontend
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
  
    res.status(201).json({
      user: {
        email: user.email,
        username: user.username,
        bio: user.bio,
        profileImage: user.profileImage
      }
    })
  }

async function loginController(req, res) {
    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [
            {
                username: username
            },
            {
                email: email
            }
        ]
    })

    if(!user) {
        return res.status(404).json({
            message: "user not found"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.status(401).json({
            message: "invalid password"
        })
    }

    const token = jwt.sign(
        { id: user._id,
          user: user.username,
          
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,   // required for localhost (true only in HTTPS)
      sameSite: "lax", // required for cross-origin frontend
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      email: user.email,
      username: user.username,
      bio: user.bio,
      profileImage: user.profileImage
    }
  })

}

async function getmeController(req, res) {
  try {
    // 1️⃣ Make sure middleware attached user
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Unauthorized access"
      })
    }

    const user = await userModel.findById(req.user.id)

    // 2️⃣ Check if user exists in DB
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    // 3️⃣ Send response
    res.status(200).json({
      message: "User fetched successfully",
      user: {
        email: user.email,
        username: user.username,
        bio: user.bio,
        profileImage: user.profileImage
      }
    })

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    })
  }
}
module.exports = {
    registerController,
    loginController,
    getmeController
}