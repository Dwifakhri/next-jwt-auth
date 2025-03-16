"use client";
// import api from "@/utils/axiosInstance";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const fetchProtected = async () => {
    try {
      const res = await fetch("/api/protected");
      const data = await res.json();
      alert(data.message);
    } catch (error) {
      console.log(error);
    }
  };
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
        onClick={fetchProtected}
        disabled={loading}
        className="block mx-auto mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
        Fetch
      </button>
      <button
        onClick={logOut}
        disabled={loading}
        className="mx-auto mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
        Logout
      </button>
    </div>
  );
}
