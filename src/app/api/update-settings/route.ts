import { dbConnect } from "@/app/lib/dbConnect";
import SettingModel from "@/app/models/settings.models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try {
        const {ownerId, businessName, supportEmail , knowledge} = await request.json()
        if(!ownerId) return NextResponse.json({
            message: "All fields required"
        }, {status: 400})
        await dbConnect()

        const settings = await SettingModel.findOneAndUpdate({
            ownerId},
            {ownerId, businessName, supportEmail, knowledge}
            ,{new: true, upsert: true})

            // upsert means --> if found then update otherwise insert
            return NextResponse.json({
                message: "Settings updated",
                success: true,
                settings
            }, {status: 200})
    } catch (error) {
        return NextResponse.json({
            message: "An unexpected error occured",
            success: false
        }, {status: 500})
    }
}