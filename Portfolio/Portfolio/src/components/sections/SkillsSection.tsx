import { motion } from "framer-motion";
import { skillCategories } from "@/data/portfolio";

export function SkillsSection() {
  const allSkills = skillCategories.flatMap((category) => category.skills);

  return (
    <section id="skills" className="section-padding bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies, languages, and tools I work with
          </p>
        </motion.div>
      </div>

      <div className="w-full relative py-8">
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden group">
          <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
            <div className="flex shrink-0 items-center justify-around gap-6 px-3 min-w-max">
              {allSkills.map((skill) => (
                <div
                  key={`first-${skill.name}`}
                  className="bg-card w-40 md:w-48 rounded-xl p-4 md:p-6 border border-border hover:border-primary/50 transition-all shadow-sm hover:shadow-md hover:shadow-primary/5 flex flex-col items-center justify-center gap-4 cursor-default"
                >
                  <div className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-secondary/50 rounded-full p-2 md:p-3 transition-colors">
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className={`w-full h-full object-contain transition-all duration-300 ${(skill as any).invertDark ? "dark:invert" : ""}`}
                    />
                  </div>
                  <span className="text-sm md:text-base font-display font-semibold transition-colors text-center whitespace-nowrap">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex shrink-0 items-center justify-around gap-6 px-3 min-w-max">
              {allSkills.map((skill) => (
                <div
                  key={`second-${skill.name}`}
                  className="bg-card w-40 md:w-48 rounded-xl p-4 md:p-6 border border-border hover:border-primary/50 transition-all shadow-sm hover:shadow-md hover:shadow-primary/5 flex flex-col items-center justify-center gap-4 cursor-default"
                >
                  <div className="relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-secondary/50 rounded-full p-2 md:p-3 transition-colors">
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className={`w-full h-full object-contain transition-all duration-300 ${(skill as any).invertDark ? "dark:invert" : ""}`}
                    />
                  </div>
                  <span className="text-sm md:text-base font-display font-semibold transition-colors text-center whitespace-nowrap">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
