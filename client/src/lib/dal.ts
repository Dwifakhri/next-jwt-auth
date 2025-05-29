import "server-only";
import { cookies } from "next/headers";

export const getProfile = async () => {
  const cookie = cookies();
  const token = (await cookie).get("access_token")?.value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BE_API_URL}/api/me`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    });
    const user = await res.json();
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
