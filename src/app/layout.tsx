import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PrepWise AI",
  description: "AI mock interview practice platform"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
