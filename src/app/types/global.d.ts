import mongoose, { Connection } from "mongoose"

declare global {
    var mongoose: {
        connection : mongoose.Connection | null,
        promise : Promise<Connection> | null
    }
}

export {}