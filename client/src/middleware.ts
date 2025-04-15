import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = ["/", , "/protected"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const cookie = await cookies();
  const access = cookie.get("access_token")?.value;
  const refresh = cookie.get("refresh_token")?.value;

  if (refresh && !access) {
    const data = await fetch(new URL("/api/refresh-token", req.nextUrl), {
      method: "POST",
      body: JSON.stringify({ refresh_token: refresh })
    });

    if (!data.ok) {
      cookie.delete("refresh_token");
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
    const datax = await data.json();
    cookie.set("access_token", datax.access_token, {
      httpOnly: true,
      secure: true,
      maxAge: Number(process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXP) * 60,
      path: "/"
    });

    return NextResponse.redirect(new URL(path, req.nextUrl));
  }

  if (
    (isProtectedRoute && access && !refresh) ||
    (isProtectedRoute && !access && !refresh)
  ) {
    (await cookies()).delete("access_token");
    (await cookies()).delete("refresh_token");

    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (access && path === "/login") {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"]
};
