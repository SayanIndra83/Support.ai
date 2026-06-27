import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getSession } from "./app/lib/getSession";

export async function proxy(request: NextRequest) {
  const session = await getSession();
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    if (session) return NextResponse.next();
    const redirectUrl = new URL(
      `${process.env.NEXT_PUBLIC_BASE_URI}/api/auth/login`,
      request.url,
    );
    redirectUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
