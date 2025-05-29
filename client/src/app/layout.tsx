import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import { getProfile } from "@/lib/dal";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Next JWT Auth",
  description: "Example of Next JWT Auth"
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const user = await getProfile();

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
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
