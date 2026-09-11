import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

const PROTECTED_PATHS = ["/dashboard"];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this is a dashboard route
  const isDashboard = PROTECTED_PATHS.some((path) =>
    pathname.match(new RegExp(`^/(vi|en)${path}`))
  );

  if (isDashboard) {
    const sessionToken =
      request.cookies.get("next-auth.session-token") ||
      request.cookies.get("__Secure-next-auth.session-token");

    if (!sessionToken) {
      const locale = pathname.split("/")[1] || "vi";
      const loginUrl = new URL(`/${locale}/auth/login`, request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!_next|_vercel|api|.*\\..*).*)",
  ],
};
