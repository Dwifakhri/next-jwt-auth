/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
export async function GET(request: Request) {
  const url = new URL(request.url);
  const queryParams = new URLSearchParams(url.searchParams).toString();

  try {
    const token = (await cookies()).get("access_token")?.value;

    const apiUrl = `${process.env.NEXT_PUBLIC_BE_API_URL}${url.pathname}${
      queryParams ? `?${queryParams}` : ""
    }`;

    const data: any = await fetch(apiUrl, {
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    const datax = await data.json();
    return new Response(JSON.stringify(datax), {
      status: datax.status,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: unknown) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500
    });
  }
}
