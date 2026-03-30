import { useEffect, useState } from "react";

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the visible section with highest intersection ratio
        let maxRatio = 0;
        let selectedId = "";
        
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            selectedId = entry.target.id;
          }
        });

        if (selectedId) setActiveSection(selectedId);
      },
      {
        threshold: [0.1, 0.3, 0.5, 0.7, 0.9], // Much more sensitive tracking
        rootMargin: "-10% 0px -10% 0px", // More forgiving boundaries
      }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return { activeSection, setActiveSection };
}
