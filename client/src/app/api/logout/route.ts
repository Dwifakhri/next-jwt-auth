import { cookies } from "next/headers";
export async function POST() {
  try {
    (await cookies()).delete("token");
    return Response.json({ message: "Logout successful" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Logout failed" }, { status: 500 });
  }
}
