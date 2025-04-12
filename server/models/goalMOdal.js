import mongoose from "mongoose";



const goalSchema=new mongoose.Schema({
    title:{type:String,required:true},
    color:{type:String,required:true}
})

const Goal=mongoose.models.Goal||mongoose.model("Goal",goalSchema)

export default Goal