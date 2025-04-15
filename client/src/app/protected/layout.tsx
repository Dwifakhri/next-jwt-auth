export default function ProtectedLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="main">{children}</div>;
}
