import { motion } from "framer-motion";
import { FileText, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ResumeSection() {
  return (
    <section id="resume" className="section-padding bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            My <span className="gradient-text">Resume</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            View my professional resume
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-card rounded-2xl border border-border p-8 text-center group hover:border-primary/50 transition-all hover:shadow-xl">
            <motion.div
              whileHover={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 0.5 }}
              className="w-20 h-24 mx-auto mb-6 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border-2 border-dashed border-primary/30 group-hover:border-primary/60 transition-colors"
            >
              <FileText className="h-10 w-10 text-primary" />
            </motion.div>

            <h3 className="text-xl font-display font-semibold mb-2">
              Dhruv Ozha
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Aspiring Software Developer • Resume
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="flex-1 gradient-bg"
                onClick={() => {
                  // Placeholder - will be replaced with actual resume link
                  // alert("Resume will be available soon! Please add your resume PDF.");
                  window.open("https://dhruvozha-resume.vercel.app/", "_blank");
                }}
              >
                <Eye className="h-5 w-5 mr-2" />
                View Resume
              </Button>
              {/* <Button
                size="lg"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  // Placeholder - will be replaced with actual download
                  window.open("/Dhruv_Ozha_Resume.pdf", "_blank");
                }}
              >
                <Download className="h-5 w-5 mr-2" />
                Download
              </Button> */}
            </div>

            {/* <p className="text-xs text-muted-foreground mt-4 italic">
              (Add your resume PDF to enable download)
            </p> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
