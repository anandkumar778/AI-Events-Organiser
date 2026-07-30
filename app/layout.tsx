import "./globals.css";
import type { Metadata } from "next";
import AuthProvider from "@/app/context/AuthContext";

export const metadata: Metadata = {
  title: "AI Events Organiser - Premium Event Management Platform",
  description: "Create, manage, and organize events with AI-powered tools. Simplify your event planning experience.",
  keywords: "events, event management, booking, AI tools, event organizer",
  robots: "index, follow",
  openGraph: {
    title: "AI Events Organiser",
    description: "Premium event management platform powered by AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}