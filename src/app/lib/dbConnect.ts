import mongoose from "mongoose"

export async function dbConnect() : Promise<void> {
    let cache = global.mongoose
    if(!cache) {
        cache = global.mongoose = {connection : null, promise : null}
    }

    if(!process.env.MONGO_URI) throw Error("mongo db url not provided")
    
        if(cache.connection){
            console.log("Database already connected")
            return
        }
        if(!cache.promise) cache.promise =  mongoose.connect(process.env.MONGO_URI).then((conn)=> conn.connection)
    try {

        cache.connection = await cache.promise
        console.log("DB connected")
        return 
        
    } catch (error) {
        console.log("Mongodb connection failed", error)
        process.exit(1)
    }
}