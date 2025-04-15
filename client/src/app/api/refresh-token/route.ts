import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { refresh_token } = await req.json();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BE_API_URL}/api/refresh`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token })
      }
    );

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }
    const dataUser = await fetch(
      `${process.env.NEXT_PUBLIC_BE_API_URL}/api/me`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${data.access_token}` }
      }
    );

    if (!dataUser.ok) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Error in refresh-token API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
