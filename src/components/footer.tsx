import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-primary/20 bg-background/95">
      <div className="container mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Anas Aammari. All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <Link href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="Github">
            <Github className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
          </Link>
          <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
          </Link>
          <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
