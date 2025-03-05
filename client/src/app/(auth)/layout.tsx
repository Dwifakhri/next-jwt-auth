export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="main">{children}</div>;
}
