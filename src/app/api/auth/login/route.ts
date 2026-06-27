import { scalekit } from "@/app/lib/scalekit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const redirectUri = `${process.env.NEXT_BASE_URI}/api/auth/callback`
    const options = {
    scopes: ['openid', 'profile', 'email', 'offline_access']
    };
    const authorizationUrl = scalekit.getAuthorizationUrl(redirectUri);
    console.log(authorizationUrl)

    // return NextResponse.json({
    //     message:"From login user came",
    //     success: true
    // }, {status: 200})

    return NextResponse.redirect(authorizationUrl)
}