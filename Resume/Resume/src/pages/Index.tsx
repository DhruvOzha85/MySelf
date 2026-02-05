import { Mail, Github, Linkedin, Instagram, Twitter, Youtube, Download, ExternalLink, GraduationCap, Code, Briefcase, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import profilePhoto from "@/assets/dhruv-profile.jpg";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const handleDownloadPDF = () => {
    window.print();
  };

  const skills = {
    frontend: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
    backend: ["Node.js", "Express.js", "MongoDB"],
    languages: ["C", "JavaScript"],
    tools: ["Git", "GitHub", "VS Code", "Postman", "Render", "Netlify"],
    design: ["Figma"],
  };

  const projects = [
    {
      title: "Website Clone Project",
      link: "https://webcloneproject.netlify.app/",
      description: "Developed a responsive clone of an existing website with a focus on layout accuracy, clean UI, and mobile responsiveness.",
      techStack: ["HTML", "CSS", "JavaScript"],
      role: "Designed the user interface and implemented a fully responsive frontend layout.",
    },
    {
      title: "Personal Portfolio Website",
      link: "https://dhruvozhaportfolio.netlify.app/",
      description: "Designed and developed a personal portfolio website to showcase projects, technical skills, and contact information.",
      techStack: ["React", "HTML", "CSS", "JavaScript"],
      role: "Built reusable React components, designed the UI, and implemented responsive layouts.",
    },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/DhruvOzha85", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/dhruv-ozha-bb378639b/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/dhruv.ozha/", label: "Instagram" },
    { icon: Twitter, href: "https://x.com/dhruvozha85", label: "Twitter" },
    { icon: Youtube, href: "https://www.youtube.com/@DhruvOzha", label: "YouTube" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Download Button - Fixed */}

      {/* Resume Container */}
      <main className="resume-container max-w-3xl mx-auto px-6 py-12 md:py-16">
        
        {/* Header Section */}
        <header className="text-center mb-10 resume-section">
          <div className="mb-4">
            <img 
              src={profilePhoto} 
              alt="Dhruv Ozha" 
              className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-primary shadow-lg"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            Dhruv Ozha
          </h1>
          <p className="text-lg text-primary font-medium mb-4">
            Frontend Developer | Full Stack Developer | UI/UX Designer
          </p>
          
          {/* Contact Bar */}
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-muted-foreground">
            <a 
              href="mailto:ozhadhruv@gmail.com" 
              className="resume-link flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Mail className="h-4 w-4" />
              ozhadhruv@gmail.com
            </a>
            <a 
              href="https://github.com/DhruvOzha85" 
              target="_blank" 
              rel="noopener noreferrer"
              className="resume-link flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/dhruv-ozha-bb378639b/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="resume-link flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </header>

        <Separator className="mb-8" />

        {/* Profile Summary */}
        <section className="mb-8 resume-section">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-primary" />
            <h2 className="section-heading !mb-0 !border-l-0 !pl-0">Profile Summary</h2>
          </div>
          <Card className="border-l-4 border-l-primary">
            <CardContent className="pt-4">
              <p className="text-muted-foreground leading-relaxed">
                A highly motivated first-year Computer Science Engineering student with a strong foundation in frontend development and programming. Passionate about building responsive, user-friendly web interfaces and continuously improving problem-solving skills through hands-on coding and real-world projects. Actively learning full stack development and UI/UX design while pursuing a Bachelor of Engineering degree.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Education Section */}
        <section className="mb-8 resume-section">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="h-5 w-5 text-primary" />
            <h2 className="section-heading !mb-0 !border-l-0 !pl-0">Education</h2>
          </div>
          
          <div className="space-y-4">
            <div className="border-l-2 border-border pl-4 hover:border-primary transition-colors">
              <h3 className="font-semibold text-foreground">
                Bachelor of Engineering (B.E.) in Computer Science Engineering
              </h3>
              <p className="text-primary font-medium">Swaminarayan University</p>
              <p className="text-sm text-muted-foreground">Currently in 1st Year</p>
            </div>
            
            <div className="border-l-2 border-border pl-4 hover:border-primary transition-colors">
              <h3 className="font-semibold text-foreground">Additional Training</h3>
              <p className="text-primary font-medium">Coding Gita Institute</p>
              <p className="text-sm text-muted-foreground">
                Actively learning programming and web development through structured coursework and self-practice.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Skills */}
        <section className="mb-8 resume-section">
          <div className="flex items-center gap-2 mb-4">
            <Code className="h-5 w-5 text-primary" />
            <h2 className="section-heading !mb-0 !border-l-0 !pl-0">Technical Skills</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Frontend Development
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.frontend.map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="secondary" 
                    className={`${skill === "HTML" || skill === "CSS" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`}
                  >
                    {skill}
                    {(skill === "HTML" || skill === "CSS") && <span className="ml-1 text-xs">★</span>}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Backend Development
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.backend.map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-accent text-accent-foreground">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Programming Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="secondary" 
                    className={`${skill === "C" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`}
                  >
                    {skill}
                    {skill === "C" && <span className="ml-1 text-xs">★</span>}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Tools & Platforms
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-accent text-accent-foreground">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                UI/UX Design
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.design.map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-accent text-accent-foreground">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-8 resume-section">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="h-5 w-5 text-primary" />
            <h2 className="section-heading !mb-0 !border-l-0 !pl-0">Projects</h2>
          </div>
          
          <div className="space-y-4">
            {projects.map((project, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-foreground">{project.title}</h3>
                    {project.link !== "#" && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1 text-sm"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Live
                      </a>
                    )}
                  </div>
                  
                  <ul className="text-sm text-muted-foreground space-y-1.5 mb-3">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      {project.description}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      {project.role}
                    </li>
                  </ul>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="mb-8" />

        {/* Social Links / Footer */}
        <footer className="text-center resume-section">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
            Connect With Me
          </h2>
          
          <div className="flex justify-center gap-4 mb-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-accent hover:bg-primary hover:text-primary-foreground transition-all"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
          
          <p className="text-sm text-muted-foreground">
            <a href="mailto:ozhadhruv@gmail.com" className="hover:text-primary transition-colors">
              ozhadhruv@gmail.com
            </a>
          </p>
          
          <p className="text-xs text-muted-foreground mt-4">
            © {new Date().getFullYear()} Dhruv Ozha. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
