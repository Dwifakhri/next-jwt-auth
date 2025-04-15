import { cookies } from "next/headers";

export const POST = async (req: Request) => {
  const { access_token } = await req.json();

  try {
    const cookie = cookies();
    (await cookie).set("access_token", access_token, {
      httpOnly: true,
      secure: true,
      path: "/"
    });

    return Response.json({ message: "Set token successful" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Set token failed" }, { status: 500 });
  }
};
