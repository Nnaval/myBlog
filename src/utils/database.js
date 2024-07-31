import mongoose from "mongoose";



export const connectToDb = async () => {
 
    try {
        await mongoose.connect (process.env.MONGODB_URI)

        // console.log("mongodb is connected now");
    } catch (error) {
        throw new Error ("mongo connection failed")
    }
}
