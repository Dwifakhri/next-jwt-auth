import { cookies } from "next/headers";
export async function POST() {
  try {
    (await cookies()).delete("access_token");
    (await cookies()).delete("refresh_token");
    return Response.json({ message: "Logout successful" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Logout failed" }, { status: 500 });
  }
}
