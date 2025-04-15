/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";
import { cookies } from "next/headers";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_API_URL + "/api",
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(async (config) => {
  const cookie = await cookies();
  const access = cookie.get("access_token")?.value;
  const refresh = cookie.get("refresh_token")?.value;
  if (access && refresh) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: any) => {
    const cookie = await cookies();

    if (error.response.status === 401) {
      const refresh = cookie.get("refresh_token")?.value;
      if (refresh) {
        const tokenResponse = await api.post("/refresh", {
          refresh_token: refresh
        });
        const newAccessToken = tokenResponse.data.access_token;
        cookie.set("access_token", newAccessToken, {
          httpOnly: true,
          secure: true,
          maxAge: Number(process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXP) * 60,
          path: "/"
        });
        console.log(newAccessToken, "newAccessToken");

        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return api.request(error.config);
      }
    }
  }
);

export default api;
