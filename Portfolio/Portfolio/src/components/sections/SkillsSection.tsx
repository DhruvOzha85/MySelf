import { motion } from "framer-motion";
import { skills } from "@/data/portfolio";
import { Progress } from "@/components/ui/progress";

export function SkillsSection() {
  return (
    <section id="skills" className="section-padding bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I work with
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all shadow-sm hover:shadow-lg hover:shadow-primary/5 flex flex-col items-center justify-center gap-4 group"
            >
              <div className="relative w-16 h-16 flex items-center justify-center bg-secondary/50 rounded-full p-3 group-hover:bg-primary/10 transition-colors">
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-full h-full object-contain transition-all duration-300"
                />
              </div>
              <h3 className="text-lg font-display font-semibold group-hover:text-primary transition-colors">{skill.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
