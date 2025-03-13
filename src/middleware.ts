// export { auth as middleware } from "@/auth";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import {
  authRoutes,
  publicRoutes,
} from "./services/middlewareRoutes/middlewareRoutes";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  const { pathname } = request.nextUrl;

  const isPublicRoutes = publicRoutes.some(
    (route) => pathname.startsWith(route) || pathname === route
  );

  const isAuthRoute = authRoutes.some(
    (route) => pathname.startsWith(route) || pathname === route
  );

  if (isPublicRoutes) {
    return NextResponse.next();
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isAuthRoute && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  //   the default is middleware
  return NextResponse.next();
}

// Specify which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all routes except:
     * 1. /api (API routes)
     * 2. /_next (Next.js internals)
     * 3. /_static (static files)
     * 4. /_vercel (Vercel internals)
     * 5. /favicon.ico, /logo.svg, etc (static files)
     */
    "/((?!api|_next|_static|_vercel|favicon.ico|logo.svg).*)",
  ],
};
