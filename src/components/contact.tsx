import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

const contacts = [
    {
        command: "connect --github",
        href: "https://github.com",
        icon: Github
    },
    {
        command: "connect --linkedin",
        href: "https://linkedin.com",
        icon: Linkedin
    },
    {
        command: "connect --email",
        href: "mailto:contact@example.com",
        icon: Mail
    }
]

export function Contact() {
  return (
    <section id="contact" className="py-24">
      <h2 className="text-3xl font-bold mb-8 text-primary">
        <span className="text-foreground/80">~/</span>contact $
      </h2>
      <div className="bg-card border-primary/20 border p-6 rounded-lg">
        <p className="text-muted-foreground mb-6">Execute commands to connect:</p>
        <div className="space-y-4">
            {contacts.map((contact, index) => (
                <div key={index} className="flex items-center gap-4 flex-wrap">
                    <span className="text-primary">$</span>
                    <Link href={contact.href} target="_blank" rel="noopener noreferrer" className="flex-1 group">
                        <div className="flex items-center bg-input/50 p-3 rounded-md hover:bg-input transition-colors">
                            <contact.icon className="h-5 w-5 mr-3 text-accent" />
                            <span className="text-foreground group-hover:text-primary transition-colors">{contact.command}</span>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
