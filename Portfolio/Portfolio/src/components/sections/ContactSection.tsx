import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Instagram, Youtube, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { socialLinks } from "@/data/portfolio";
import { useState, useRef } from "react";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';

const socialIcons = [
  { icon: Github, href: socialLinks.github, label: "GitHub" },
  { icon: Linkedin, href: socialLinks.linkedin, label: "LinkedIn" },
  { icon: Instagram, href: socialLinks.instagram, label: "Instagram" },
  { icon: Youtube, href: socialLinks.youtube, label: "YouTube" },
];

export function ContactSection() {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // THESE ARE PLACEHOLDERS - USER MUST REPLACE THEM
    const SERVICE_ID = "YOUR_SERVICE_ID";
    const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
    const PUBLIC_KEY = "YOUR_PUBLIC_KEY";

    try {
      if (form.current) {
        await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY);
        toast.success("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto px-4">
        {/* ... (existing header code) ... */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* ... (existing contact info code) ... */}
            <div>
              <h3 className="text-2xl font-display font-semibold mb-4">
                Let's Connect
              </h3>
              <p className="text-muted-foreground">
                I'm always open to discussing new opportunities, interesting
                projects, or just having a chat about technology.
              </p>
            </div>

            <div className="space-y-4">
              <motion.a
                href={`mailto:${socialLinks.email}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group"
                whileHover={{ x: 5 }}
              >
                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground text-sm">{socialLinks.email}</p>
                </div>
              </motion.a>
            </div>

            <div>
              <h4 className="font-display font-semibold mb-4">Follow Me</h4>
              <div className="flex gap-3">
                {socialIcons.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  placeholder="Your Name"
                  name="user_name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="h-12"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  name="user_email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="h-12"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Textarea
                  placeholder="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="resize-none"
                  disabled={isSubmitting}
                />
              </div>
              <Button type="submit" size="lg" className="w-full gradient-bg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
