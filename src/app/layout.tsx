import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "File Explorer",
  description: "created by Patryk Warecki",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
