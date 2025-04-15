import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import { getProfile } from "@/lib/dal";
import Navbar from "@/components/Navbar";
import Token from "@/components/Token";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Next JWT Auth",
  description: "Example of Next JWT Auth"
};

export default async function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getProfile();

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Token user={user} />
        <AuthProvider initialUser={user}>
          <div>
            <Navbar />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
