import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { EasterEggTerminal } from "@/components/easter-egg-terminal";
import { FirebaseClientProvider } from "@/firebase/client-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cyber Portfolio",
  description: "Anas Aammari - Software Engineer | Problem Solver | AI Explorer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ scrollBehavior: 'smooth' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-code antialiased">
        <FirebaseClientProvider>
          {children}
        </FirebaseClientProvider>
        <Toaster />
        <EasterEggTerminal />
      </body>
    </html>
  );
}
