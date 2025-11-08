import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { EasterEggTerminal } from "@/components/easter-egg-terminal";
import { AnimatedDocumentTitle } from "@/components/animated-document-title";
import { cn } from "@/lib/utils";
import "./globals.css";

const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mind of Code",
  description:
    "Where curiosity meets creativity — building intelligent systems for a smarter world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark"
      style={{ scrollBehavior: "smooth" }}
      suppressHydrationWarning
    >
      <body
        className={cn(firaCode.className, "antialiased")}
        suppressHydrationWarning
      >
        {children}
        <Toaster />
        <EasterEggTerminal />
        <AnimatedDocumentTitle />
      </body>
    </html>
  );
}
