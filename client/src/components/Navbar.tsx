"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const path = usePathname();
  return (
    <div className="shadow shadow-bottom">
      <div className="container p-4 mx-auto">
        <div className="flex items-center justify-center gap-10">
          <Link
            href={"/guest"}
            className={`hover:text-black ${
              path === "/guest" ? "text-black font-bold" : ""
            }`}>
            Guest
          </Link>
          <Link
            href={"/"}
            className={`hover:text-black ${
              path === "/" ? "text-black font-bold" : ""
            }`}>
            Home
          </Link>
          <Link
            href={"/login"}
            className={`hover:text-black ${
              path === "/login" ? "text-black font-bold" : ""
            }`}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
