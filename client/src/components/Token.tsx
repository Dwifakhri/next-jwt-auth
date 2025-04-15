/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SetTokenClient({ user }: { user: any }) {
  const router = useRouter();
  useEffect(() => {
    const sendToken = async () => {
      await fetch("/api/settoken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ access_token: user?.access_token })
      });
    };
    const logOut = async () => {
      await fetch("/api/logout", {
        method: "POST"
      });
      return router.push("/login");
    };

    if (user?.access_token) {
      sendToken();
    } else if (!user) {
      logOut();
    }
  }, [user]);

  return null;
}
