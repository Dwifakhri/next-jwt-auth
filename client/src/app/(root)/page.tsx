"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const logOut = async () => {
    try {
      setLoading(true);
      await fetch("/api/logout", { method: "POST" });
      router.push("/login");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="text-center">
      <h5 className="text-2xl mb-4">Home</h5>
      <p className="mb-4">This is protected page</p>
      <div>
        <code>{JSON.stringify(user, null, 2)}</code>
      </div>
      <button
        onClick={logOut}
        disabled={loading}
        className="mx-auto mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
        Logout
      </button>
    </div>
  );
}
