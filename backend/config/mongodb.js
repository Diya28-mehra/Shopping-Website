import mongoose from "mongoose";

const connectDB = async() =>{
    mongoose.connection.on('connected',()=>{
        console.log("DB Connected")
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/shopping-website`, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    })
}

export default connectDB;