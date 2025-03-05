import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const verifySession = cache(async () => {
  const cookie = cookies();
  const token = (await cookie).get("token")?.value;
  return token;
});

export const getProfile = cache(async () => {
  const token = await verifySession();
  if (!token) {
    return null;
  }

  try {
    const res = await fetch(`http://localhost:8000/api/me`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) {
      return redirect("/login");
    }
    const user = await res.json();
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
});
