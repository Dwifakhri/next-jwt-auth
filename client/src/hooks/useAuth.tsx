/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
// import { redirect, useRouter } from "next/navigation";
import React, { createContext, useContext, useState } from "react";

interface AuthContextProps {
  user: any;
  setUser: (user: any) => void;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({
  initialUser,
  children
}: {
  initialUser: any;
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(initialUser);

  const logOut = () => {
    setUser(null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
