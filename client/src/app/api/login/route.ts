/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
export async function POST(req: Request) {
  try {
    const requestBody = await req.json();
    const response: any = await fetch(
      `${process.env.NEXT_PUBLIC_BE_API_URL}/api/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      }
    );

    const data = await response.json();
    if (!response.ok) {
      return new Response(JSON.stringify(data), {
        status: response.status,
        statusText: data.message
      });
    }
    const responseUser: any = await fetch(
      `${process.env.NEXT_PUBLIC_BE_API_URL}/api/me`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.access_token}`
        }
      }
    );
    (await cookies()).set("access_token", data.access_token, {
      secure: true,
      httpOnly: true
    });
    (await cookies()).set("refresh_token", data.refresh_token, {
      secure: true,
      httpOnly: true
    });
    const user = await responseUser.json();
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: unknown) {
    console.log(error);

    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500
    });
  }
}
