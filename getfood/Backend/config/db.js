import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://admin:admin123@cluster0.lhgma.mongodb.net/get-food').then(()=>console.log("DB Connected..."))
}