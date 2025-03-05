import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = ["/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const cookie = await cookies();
  const auth = cookie.get("token");

  if (isProtectedRoute && !auth) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (auth && path === "/login") {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"]
};
