/* eslint-disable @typescript-eslint/no-explicit-any */
import { checkUser } from "@/functions/token";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookie = cookies();
    const token = (await cookie).get("access_token")?.value;
    const auth = await checkUser(token || "");

    if (!auth) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401
      });
    }

    const newToken = (await cookie).get("access_token")?.value;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BE_API_URL}/api/protected`,
      { headers: { Authorization: `Bearer ${newToken}` } }
    );

    const data = await res.json();
    if (!res.ok) {
      return new Response(JSON.stringify(data), {
        status: res.status,
        statusText: data.message
      });
    }
    return new Response(JSON.stringify(data), {
      status: res.status,
      statusText: data.message
    });
  } catch (error: any) {
    console.log(error);
    return new Response(JSON.stringify({ error }), {
      status: error
    });
  }
}
