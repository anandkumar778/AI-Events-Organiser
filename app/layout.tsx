import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Events Organiser",
  description: "AI Powered Event Management Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}