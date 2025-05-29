import { NextRequest, NextResponse } from "next/server";
import { refreshToken, checkUser } from "./functions/token";

const protectedRoutes = ["/", "/protected"];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtectedRoute = protectedRoutes.includes(pathname);

  const access = req.cookies.get("access_token")?.value;
  const refresh = req.cookies.get("refresh_token")?.value;

  if (pathname === "/login" && access) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (isProtectedRoute) {
    if (access) {
      const user = await checkUser(access);
      if (user) {
        const res = NextResponse.next();
        if (user.access_token) {
          res.cookies.set("access_token", user.access_token, {
            httpOnly: true,
            secure: true,
            maxAge: Number(process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXP) * 60,
            path: "/"
          });
        }
        return res;
      }
    }

    if (refresh) {
      try {
        const newAccess = await refreshToken(refresh);
        const res = NextResponse.redirect(new URL(pathname, req.nextUrl));
        res.cookies.set("access_token", newAccess, {
          httpOnly: true,
          secure: true,
          maxAge: Number(process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXP) * 60,
          path: "/"
        });
        return res;
      } catch (error) {
        console.error("Refresh token failed:", error);
      }
    }

    const res = NextResponse.redirect(new URL("/login", req.nextUrl));
    res.cookies.delete("access_token");
    res.cookies.delete("refresh_token");
    return res;
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"]
};
