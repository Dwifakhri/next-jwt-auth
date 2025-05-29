/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("admin@mail.com");
  const [password, setPassword] = useState("123123");
  const [error, setError] = useState("");

  const loginForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        const err = await res.json();
        setError(err.message);
        setLoading(false);
        return;
      }
      const user = await res.json();
      setUser(user);
      window.location.href = "/";
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="p-0 md:p-5">
      <h5 className="text-2xl mb-4">Login</h5>
      <form className="w-full md:w-[25rem]" onSubmit={loginForm}>
        {error && (
          <div className="flex justify-between align-center border border-[#f5c6cb] bg-[#f8d7da] py-3 px-4 rounded-sm mb-3">
            <p className="text-[#721c24]">{error}</p>
            <button type="button" onClick={() => setError("")}>
              x
            </button>
          </div>
        )}
        <div className="w-full min-w-[200px] mb-3">
          <label
            htmlFor="email"
            className="block mb-2 text-sm text-black font-semibold">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-[#B0B0B0] rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="w-full min-w-[200px] mb-5">
          <label
            htmlFor="current-password"
            className="block mb-2 text-sm text-black font-semibold">
            Password
          </label>
          <input
            id="current-password"
            name="current-password"
            autoComplete="current-password"
            type="password"
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-[#B0B0B0] rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="mt-3 bg-blue-600 w-full font-semibold py-2 rounded-md text-white cursor-pointer active:bg-blue-700 disabled:bg-gray-400"
          disabled={loading}>
          Login
        </button>
      </form>
    </div>
  );
};
export default Login;
