import { motion } from "framer-motion";
import { interests } from "@/data/portfolio";

export function AboutSection() {
  return (
    <section id="about" className="py-28 md:py-40">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get to know the person behind the code
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed text-lg">
              I'm Dhruv Ozha, an aspiring software developer with a deep curiosity for how
              things work on the web. I enjoy crafting clean, responsive, and user-friendly
              applications that solve real-world problems and leave a lasting impression.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              My core expertise lies in frontend development with React, JavaScript, and
              modern CSS — complemented by a growing understanding of backend technologies
              and database design. I'm also actively sharpening my problem-solving skills
              through consistent practice on platforms like LeetCode.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              I believe great software is built at the intersection of clean code and
              thoughtful design. My goal is to keep learning, contribute to meaningful
              projects, and grow into a well-rounded engineer who builds products that
              people genuinely enjoy using.
            </p>
          </div>

          <div className="pt-6">
            <h4 className="text-lg font-display font-semibold mb-4 text-center">
              My Interests
            </h4>
            <div className="flex flex-wrap justify-center gap-3">
              {interests.map((interest, index) => (
                <motion.span
                  key={interest.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground flex items-center gap-2 cursor-default"
                >
                  <span>{interest.icon}</span>
                  <span className="text-sm font-medium">{interest.name}</span>
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
