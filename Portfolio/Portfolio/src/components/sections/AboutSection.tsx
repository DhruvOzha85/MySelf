import { motion } from "framer-motion";
import { interests } from "@/data/portfolio";
import profilePhoto from "@/assets/profile-placeholder.jpg";

export function AboutSection() {
  return (
    <section id="about" className="section-padding">
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

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group"
          >
            <div className="relative w-72 h-72 md:w-80 md:h-80 mx-auto">
              <div className="absolute inset-0 rounded-2xl gradient-bg opacity-50 blur-xl group-hover:opacity-70 transition-opacity" />
              <img
                src={profilePhoto}
                alt="Dhruv Ozha"
                className="relative w-full h-full object-cover rounded-2xl border-2 border-border shadow-2xl group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-display font-semibold">
              Hello! I'm Dhruv
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              I'm an aspiring software developer with a passion for creating 
              beautiful and functional web applications. Currently focusing on 
              frontend development with React and modern JavaScript, I'm 
              constantly learning and improving my skills.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, 
              solving problems on LeetCode, or pursuing my hobbies. I believe 
              in writing clean, maintainable code and building products that 
              make a difference.
            </p>

            <div className="pt-4">
              <h4 className="text-lg font-display font-semibold mb-4">
                My Interests
              </h4>
              <div className="flex flex-wrap gap-3">
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
      </div>
    </section>
  );
}
