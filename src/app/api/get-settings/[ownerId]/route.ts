import { dbConnect } from "@/app/lib/dbConnect";
import SettingModel from "@/app/models/settings.models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params} : {params: Promise<{ownerId : string}>}){
    try {
        const {ownerId} = await params
        if(!ownerId) return NextResponse.json({
                    message: "All fields required"
                }, {status: 400})

        await dbConnect()
        const settings = await SettingModel.findOne({ownerId})
        if(!settings){
            return NextResponse.json({
                message: "Settings not saved yet.",
                success: false
            }, {status: 404})
        }

        return NextResponse.json({
                settings,
                message: "Settings found",
                success: true
            }, {status: 200})
    } catch (error) {
        return NextResponse.json({
                    message: "An unexpected error occured",
                    success: false
                }, {status: 500})
    }
}