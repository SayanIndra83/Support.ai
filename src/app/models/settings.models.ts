import mongoose, { Model } from "mongoose";

export interface ISetting extends Document{
ownerId: string,
businessName: string,
supportEmail : string,
knowledge : string
}

const settingSchema = new mongoose.Schema<ISetting>({
ownerId:{
    type: String, 
    required: true,
    unique: true
},
businessName:{
    type: String
},
supportEmail:{
    type: String,
    match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please provide a valid email address."],
},
knowledge:{
    type: String
},
}, {timestamps: true})

const SettingModel = mongoose.models.Setting as Model<ISetting> || mongoose.model<ISetting>("Setting", settingSchema)


export default SettingModel