const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173", // exact frontend URL
    credentials: true               // allow cookies / credentials
  }));

// req routes
const authRouter = require("./routes/auth.routes")
const postRouter = require("./routes/post.routes")
const userRouter = require("./routes/user.routes")

// using routes
app.use("/api/auth", authRouter)
app.use("/api/posts", postRouter)
app.use("/api/users", userRouter)



module.exports = app;