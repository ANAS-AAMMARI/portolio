"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Github, Linkedin, Mail, Send, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

const socialLinks = [
    {
        name: "Github",
        href: "https://github.com",
        icon: Github
    },
    {
        name: "LinkedIn",
        href: "https://linkedin.com",
        icon: Linkedin
    }
]

const contactInfo = [
    {
        value: "lemkharbechy@gmail.com",
        icon: Mail
    },
    {
        value: "+212 697 325 495",
        icon: Phone
    },
    {
        value: "Marrakech, Maroc",
        icon: MapPin
    }
]

export function Contact() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // This is a mock submission. In a real app, you'd send this to your backend.
    console.log(values);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    form.reset();
  }

  return (
    <section id="contact" className="py-24">
      <h2 className="text-3xl font-bold mb-2 text-primary">
        <span className="text-foreground/80">~/</span>contact $
      </h2>
      <p className="text-primary text-lg mb-8">Let's work together</p>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <p className="text-muted-foreground">
            I'm currently available for professional opportunities as a Full Stack developer. Don't hesitate to contact me to discuss your projects or for any other information.
          </p>
          <div className="space-y-4">
            {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full border border-primary/20">
                        <info.icon className="h-5 w-5 text-primary"/>
                    </div>
                    <span className="text-muted-foreground">{info.value}</span>
                </div>
            ))}
          </div>
          <div>
            <p className="text-muted-foreground mb-4">Find me on:</p>
            <div className="flex gap-4">
                {socialLinks.map((social) => (
                    <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="icon" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                            <social.icon className="h-5 w-5"/>
                        </Button>
                    </Link>
                ))}
            </div>
          </div>
        </div>

        <Card className="bg-card/80 border-primary/20 p-6 rounded-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Your message" {...field} rows={5}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </section>
  );
}
