import mongoose from "mongoose"

async function dbConnect(){
    try {
        await mongoose.connect('mongodb+srv://santhosh49451:san63011@cluster0.u4xanv5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log("db connected")
    } catch (error) {
        console.log(error)
        
    }
}

export default dbConnect