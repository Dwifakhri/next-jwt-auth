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
    if (res.status === 401) {
      const refresh_token = (await cookie).get("refresh_token")?.value;
      const resx = await fetch(
        `${process.env.NEXT_PUBLIC_BE_API_URL}/api/refresh`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh_token })
        }
      );
      if (!resx.ok) {
        return null;
      }

      const newRes = await resx.json();

      try {
        const userx = await fetch(
          `${process.env.NEXT_PUBLIC_BE_API_URL}/api/me`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${newRes.access_token}` }
          }
        );
        const usera = await userx.json();
        return { ...usera, access_token: newRes.access_token };
      } catch (error) {
        console.log(error);
        return null;
      }
    }

    const user = await res.json();
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
