import { cookies } from "next/headers";

export const POST = async (req: Request) => {
  const cookie = cookies();
  (await cookie).delete("access_token");
  const { access_token } = await req.json();

  try {
    (await cookie).set("access_token", access_token, {
      secure: true,
      httpOnly: true
    });

    return new Response(JSON.stringify({ message: "success" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Logout failed" }, { status: 500 });
  }
};
