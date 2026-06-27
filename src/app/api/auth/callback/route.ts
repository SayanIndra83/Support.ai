import { scalekit } from "@/app/lib/scalekit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        {
          message: "An unexpected error occured",
          success: false,
        },
        { status: 400 },
      );
    }
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URI}/api/auth/callback`;
    const authResult = await scalekit.authenticateWithCode(code, redirectUri);

    const { user, idToken, accessToken, refreshToken } = authResult;
    console.log(authResult);

    const response = NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URI}/`,
    );

    response.cookies.set("access_token", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        message: "An unexpected error occured",
        success: false,
      },
      { status: 500 },
    );
  }
}
