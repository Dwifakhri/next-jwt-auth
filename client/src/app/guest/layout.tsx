export default function GuestLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="main">{children}</div>;
}
