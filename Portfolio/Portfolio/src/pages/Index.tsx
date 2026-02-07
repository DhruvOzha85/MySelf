import { Navbar } from "@/components/Navbar";
import { CustomCursor } from "@/components/CustomCursor";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { CertificatesSection } from "@/components/sections/CertificatesSection";
import { LeetCodeSection } from "@/components/sections/LeetCodeSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <CustomCursor />
      <BackgroundEffects />
      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificatesSection />
        <LeetCodeSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
