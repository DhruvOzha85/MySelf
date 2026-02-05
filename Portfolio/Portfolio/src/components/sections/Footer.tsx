import { motion } from "framer-motion";
import { ArrowUp, Heart, Github, Linkedin, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { socialLinks } from "@/data/portfolio";

const socialIcons = [
  { icon: Github, href: socialLinks.github, label: "GitHub" },
  { icon: Linkedin, href: socialLinks.linkedin, label: "LinkedIn" },
  { icon: Instagram, href: socialLinks.instagram, label: "Instagram" },
  { icon: Youtube, href: socialLinks.youtube, label: "YouTube" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        {/* <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {socialIcons.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>

          <p className="text-muted-foreground text-sm flex items-center gap-2">
            Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> by Dhruv Ozha
          </p>

          <motion.div whileHover={{ y: -3 }}>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollToTop}
              className="rounded-full"
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </motion.div>
        </div> */}

        <div className="text-center mt-8 pt-8 border-t border-border/50">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Dhruv Ozha. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
