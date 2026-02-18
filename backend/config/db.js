//connect to db : 
import mongoose from "mongoose"

export const connectDb = async()=> {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MONGO DB IS SUCCESSFULLY CONNECTED!")
    }
    catch(error){
        console.log("error connecting",error)
        process.exit(1)  // exit with failure
    }
}