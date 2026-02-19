const mongoose = require("mongoose")

async function connectToDatabse() {
    await mongoose.connect(process.env.MONGO_URI)

    console.log("connected to db");
    
}


module.exports = connectToDatabse;