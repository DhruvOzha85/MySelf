import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/portfolio";
import { MagneticWrapper } from "@/components/MagneticWrapper";
import { HolographicCard } from "@/components/HolographicCard";

export function ProjectsSection() {
  // Custom sorting to make CropPilot (ID: 2) the featured flagship project!
  const sortedProjects = [
    projects.find(p => p.id === 2)!, // CropPilot
    projects.find(p => p.id === 3)!, // AI Engine
    projects.find(p => p.id === 1)!, // Web Clone
  ];

  const [focusedId, setFocusedId] = useState<number | null>(null);

  return (
    <section id="projects" className="section-padding bg-secondary/10 relative">
      {/* Editorial Focus Mode Overlay */}
      <AnimatePresence>
        {focusedId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[40] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 relative z-[50]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A curated showcase of my best work and side projects.
          </p>
        </motion.div>

        {/* 12-Column Grid for precise Bento layouts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {sortedProjects.map((project, index) => {
            const isFeatured = index === 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`col-span-1 transition-all duration-500 ease-out relative ${isFeatured ? "md:col-span-2 lg:col-span-12" : "lg:col-span-6"} ${
                  focusedId === project.id ? "z-[60] scale-[1.02]" : "z-10"
                }`}
              >
                <HolographicCard 
                  className="h-full"
                  onFocusStart={() => setFocusedId(project.id)}
                  onFocusEnd={() => setFocusedId(null)}
                >
                  <div className={`group h-full bg-card rounded-3xl border overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/20 transition-colors flex ${
                    isFeatured 
                      ? "flex-col lg:flex-row border-primary/20 hover:border-primary/50" 
                      : "flex-col border-border hover:border-primary/30"
                  }`}>
                    {/* Visuals (Image Side) */}
                    <div className={`relative overflow-hidden bg-secondary/30 flex items-center justify-center ${
                      isFeatured ? "lg:w-[60%] h-64 md:h-80 lg:h-[400px]" : "w-full h-56 md:h-64"
                    }`}>
                      {isFeatured && (
                        <span className="absolute top-4 left-4 md:top-6 md:left-6 z-20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded-full shadow-xl flex items-center gap-2 backdrop-blur-md">
                          ✨ Flagship Project
                        </span>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 md:from-transparent to-transparent z-10 lg:hidden" />
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                      />
                    </div>

                    {/* Details (Text Side) */}
                    <div className={`relative flex flex-col justify-center p-6 md:p-8 ${
                      isFeatured ? "lg:w-[40%] lg:p-12" : "w-full"
                    }`}>
                      <h3 className={`font-display font-bold group-hover:text-primary transition-colors mb-3 md:mb-4 ${
                        isFeatured ? "text-2xl md:text-3xl lg:text-4xl" : "text-xl md:text-2xl"
                      }`}>
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm md:text-base mb-6 md:mb-8 line-clamp-4 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 text-[11px] font-medium tracking-wide rounded-full bg-secondary/50 text-secondary-foreground border border-border/50 uppercase"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-4 mt-auto">
                        {project.liveUrl !== "#" && (
                          <MagneticWrapper strength={0.3} maxDistance={100}>
                            <Button
                              variant="default"
                              className="gradient-bg rounded-lg px-6 flex-1 shadow-lg shadow-primary/20 hover:scale-[1.03] transition-transform font-semibold"
                              asChild
                            >
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Live Demo
                              </a>
                            </Button>
                          </MagneticWrapper>
                        )}
                        {project.githubUrl !== "#" && (
                          <MagneticWrapper strength={0.3} maxDistance={100}>
                            <Button variant="outline" className="flex-1 rounded-lg hover:bg-secondary hover:text-foreground hover:scale-[1.03] transition-transform text-muted-foreground font-semibold" asChild>
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4 mr-2" />
                                Source
                              </a>
                            </Button>
                          </MagneticWrapper>
                        )}
                      </div>
                    </div>
                  </div>
                </HolographicCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
