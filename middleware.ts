import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const intlMiddleware = createMiddleware(routing);

const PROTECTED_PATHS = ["/dashboard"];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin routes — require session + role admin
  if (pathname.startsWith("/admin")) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      return NextResponse.redirect(new URL("/en/auth/login", request.url));
    }

    if (token.role !== "admin") {
      return NextResponse.redirect(new URL("/en/dashboard", request.url));
    }

    return NextResponse.next();
  }

  // Dashboard routes — require session
  const isDashboard = PROTECTED_PATHS.some((path) =>
    pathname.match(new RegExp(`^/(vi|en|zh|es|id)${path}`))
  );

  if (isDashboard) {
    const sessionToken =
      request.cookies.get("next-auth.session-token") ||
      request.cookies.get("__Secure-next-auth.session-token");

    if (!sessionToken) {
      const locale = pathname.split("/")[1] || "en";
      const loginUrl = new URL(`/${locale}/auth/login`, request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|_vercel|api|.*\\..*).*)", "/admin/:path*"],
};
