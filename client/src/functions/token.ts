import { cookies } from "next/headers";

export const refreshToken = async (refreshToken: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BE_API_URL}/api/refresh`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken })
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return null;
    }
    return data.access_token;
  } catch (error) {
    console.log(error, "error fetch");
    return null;
  }
};

export const checkUser = async (accessToken: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BE_API_URL}/api/me`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (res.status === 401) {
      const cookie = cookies();
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
        (await cookie).set("access_token", newRes.access_token, {
          httpOnly: true,
          secure: true,
          maxAge: Number(process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXP) * 60,
          path: "/"
        });
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
