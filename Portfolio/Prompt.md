Create a highly professional, modern, and visually refined personal portfolio website for an aspiring software developer named "Dhruv Ozha".

The portfolio must clearly highlight technical skills, real projects, certifications, and personal details in a clean, elegant, and recruiter-friendly layout. The overall design should feel premium, minimal, and performance-focused, with smooth animations that enhance the experience without distracting the user.

=================================
PERSONAL INFORMATION
=================================
Name: Dhruv Ozha  
Email: ozhadhruv@gmail.com  
GitHub: https://github.com/DhruvOzha85
instagram: https://www.instagram.com/dhruv.ozha/
Youtube: https://www.youtube.com/@DhruvOzha
Leetcode: https://leetcode.com/u/DhruvOzha/
Twitter: https://x.com/dhruvozha85
LinkedIn: https://www.linkedin.com/in/dhruvps://github.com/DhruvOzha85  -ozha-bb378639b/  
Live Project / Clone Website: https://webcloneproject.netlify.app/

=================================
TECH STACK & TOOLS
=================================
- React (Vite preferred)
- Tailwind CSS
- Framer Motion for UI animations
- GSAP for scroll effects and custom cursor animation
- React Icons / Lucide Icons

=================================
DESIGN & UX DIRECTION
=================================
- Clean, modern, and professional design
- Minimalist layout with strong typography and spacing
- Dark or neutral color palette with subtle accent colors
- Soft shadows or light glassmorphism (no heavy effects)
- Smooth transitions and micro-interactions
- Custom animated cursor (dot + ring / magnetic hover)
- Smooth scrolling between sections
- Fully responsive across mobile, tablet, and desktop
- Optimized for fast loading and performance

=================================
NAVBAR REQUIREMENTS
=================================
- Sticky animated navbar
- Navbar items:
  Home | About | Skills | Projects | Certificates | Contact
- Active section highlight while scrolling
- Mobile hamburger menu with animation
- Clicking "Certificates" must smoothly scroll to the Certificates section
- Certificates section must appear BELOW the Projects section
- add see more option when we click see more than all certificate show ...i will add more and more certificate in future so..

=================================
SECTION STRUCTURE
=================================

1. HERO SECTION
- Large bold heading with name "Dhruv Ozha"
- Subtitle: "Aspiring Software Developer"
- Short tagline reflecting passion for building web applications
- Call-to-action buttons:
  - View Projects (scrolls to Projects section)
  - Contact Me (scrolls to Contact section)
- Social icons for GitHub and LinkedIn and twitter(X) and instagram 
- Elegant entry animation on page load

---------------------------------

2. ABOUT SECTION
- Short professional introduction
- Focus on interest in web development, learning mindset, and problem-solving
- Scroll-based text reveal animation
- Clean and readable typography

---------------------------------

3. SKILLS SECTION
- Clearly showcase technical skills:
  - HTML
  - CSS
  - JavaScript
  - React
  - MongoDB
  - C Language
- Use animated skill cards, progress bars, or meters
- Subtle hover effects for interaction
- Responsive grid layout

---------------------------------

4. PROJECTS SECTION
- Clean, responsive grid of project cards
- Each project card must include:
  - Project name
  - Short description
  - Technologies used
  - Live demo link (must include: https://webcloneproject.netlify.app/)
  - GitHub repository link
- Smooth hover animations (scale, lift, glow)
- Professional card layout with clear hierarchy

---------------------------------

5. CERTIFICATES SECTION (VERY IMPORTANT)
- This section must be placed directly BELOW the Projects section
- Navbar "Certificates" button must scroll to this section
- Display 5–6 certificate cards in a clean grid layout
- Each certificate card must show:
  - Certificate title
  - Short description explaining what the certificate is about
- Clicking a certificate card should:
  - Redirect to the actual certificate link in a new tab
- Add subtle hover and click animations
- Cards must match the professional look of the site

---------------------------------

6. CONTACT SECTION
- Display email: ozhadhruv@gmail.com (clickable)
- Social icons linking to GitHub and LinkedIn
- Optional minimal contact form
- Simple success animation on submission

---------------------------------

7. FOOTER
- Social media icons
- Copyright text
- Smooth scroll-to-top button

=================================
ADVANCED ENHANCEMENTS
=================================
- Custom GSAP-powered animated cursor
- Page load animation or minimal loader
- Custom scrollbar styling
- SEO-friendly meta tags
- Lazy loading for images
- Clean and scalable folder structure
- Reusable, readable React components
- Production-ready build for Netlify or Vercel

=================================
FINAL OBJECTIVE
=================================
The portfolio should present Dhruv Ozha as a serious, capable, and professional software developer, showcasing skills, projects, and certifications with clarity, elegance, and strong attention to user experience.
ABOUT SECTION (ENHANCED)

- Include a professional photo of Dhruv Ozha with an option to easily replace/update the image.
- Use a clean layout with:
  - Profile photo on one side
  - Text content on the other side (side-by-side on desktop, stacked on mobile)

Content to include:
- Short professional introduction highlighting interest in software development and web technologies.
- Mention personal interests to add a human touch:
  - Coding
  - Gaming
  - Video Editing
  - Chess

Design & Interaction:
- Subtle image reveal animation (fade-in / slide-in) on scroll
- Slight hover effect on the profile image (scale or glow)
- Interest icons or chips with small hover animations
- Clean typography and spacing to maintain professionalism
- Fully responsive layout

Goal:
The About section should feel personal yet professional, helping recruiters connect with the developer beyond just technical skills.
CUSTOM CURSOR INTERACTION BEHAVIOR (IMPORTANT)

- Implement a custom animated cursor using GSAP.
- The default system cursor should be hidden across the website.
- Display a custom cursor (dot + ring or minimal shape) by default.

Hover & Click Behavior:
- When the user hovers over interactive elements (buttons, links, cards, inputs):
  - The custom cursor should smoothly fade out or scale down to zero (appear hidden).
- When the user clicks anywhere on the page:
  - The custom cursor should briefly hide and reappear smoothly.
- Cursor transitions must be smooth (no sudden flicker).

UX Requirements:
- Cursor hide/show animations should feel natural and premium.
- Cursor must reappear automatically when the mouse leaves interactive elements.
- Ensure cursor behavior works consistently across all sections.
- Disable custom cursor on mobile and touch devices for better usability.

Goal:
The custom cursor interaction should enhance user experience subtly, making interactions feel clean, modern, and distraction-free.
==============================
RESUME PREVIEW & DOWNLOAD (IMPORTANT)
==============================

- Include a dedicated Resume Card or Resume Section.
- The resume should be a PDF file stored in the project.
- Resume card behavior:
  - By default, show a clean resume thumbnail or icon.
  - On hover over the resume card:
    - Show two animated buttons:
      1. "View Resume" (opens PDF in a new tab)
      2. "Download Resume" (downloads the PDF)
  - Buttons should appear with smooth fade / slide animation.
- Resume card must feel professional and minimal, not flashy.
- Ensure accessibility and mobile-friendly behavior.

Goal:
Allow recruiters to quickly preview or download the resume with minimal friction.

==============================
SUBTLE SOUND FEEDBACK (OPTIONAL BUT ENABLED)
==============================

- Add very subtle sound feedback for interactions:
  - Light click sound on button clicks
  - Soft hover sound on primary CTA buttons (optional)
- Sound must be:
  - Low volume
  - Non-distracting
  - Premium and minimal
- Include a sound toggle option (ON/OFF).
- Default sound state: OFF or remembered from last preference.
- Ensure sounds do not autoplay on page load.

Goal:
Enhance interactivity without annoying the user.

==============================
THEME TOGGLE (LIGHT / DARK MODE)
==============================

- Add a small floating theme toggle button in one corner of the screen.
- Allow switching between:
  - Light theme
  - Dark theme
- Smooth theme transition animation (colors, background, text).
- Remember selected theme using local storage.
- Theme toggle should be minimal and unobtrusive.

Goal:
Give users control while maintaining a clean UI.

==============================
BACKGROUND MICRO-ANIMATIONS (SUBTLE)
==============================

- Add minimal background animation elements:
  - Floating shapes / dots / blobs
  - Low opacity
  - Slow movement (floating, fading, drifting)
- Background elements should subtly react to cursor movement:
  - Slight parallax shift
  - Gentle fade or movement on cursor proximity
- Ensure:
  - Animations are very subtle
  - No performance impact
  - No distraction from main content

Goal:
Add depth and life to the background without making the UI feel busy or over-designed.

==============================
QUALITY CONSTRAINTS (VERY IMPORTANT)
==============================

- Avoid excessive animations.
- Maintain fast load times.
- Keep all interactions smooth and intentional.
- The portfolio must feel premium, calm, and professional.

==============================
FINAL EXPERIENCE GOAL
==============================

The website should feel like a polished product, not just a portfolio — subtle interactions, smooth animations, and thoughtful details that leave a strong impression on recruiters and developers alike.
==============================
LEETCODE SECTION (CODING PROFILE)
==============================

- Add a dedicated "LeetCode" section to showcase problem-solving practice.
- Include a clean LeetCode profile card with:
  - Platform name: LeetCode
  - Short description (e.g., "Consistent practice of DSA and problem-solving")
  - Button: "View LeetCode Profile"
  - https://leetcode.com/u/DhruvOzha/
- Clicking the button should redirect to the LeetCode profile in a new tab.
- Use subtle hover animations on the LeetCode card (scale / glow).
- Keep the section minimal and professional (no fake stats).

Optional Enhancements:
- Display a simple line like:
  "Actively practicing Data Structures & Algorithms on LeetCode"
- Avoid showing exact problem counts unless fetched dynamically and accurate.

Design Notes:
- Match the styling with Projects and Certificates sections.
- Ensure responsiveness and clean spacing.

==============================
INTERACTIVE FULL-PAGE BACKGROUND ANIMATION
==============================

- Implement a subtle, full-page animated background that reacts smoothly to mouse movement.
- The background animation should be purely decorative and must NOT interfere with content readability.

Animation Style:
- Use minimal floating elements such as:
  - Soft blobs
  - Dots
  - Gradient shapes
  - Light particles
- Elements should have:
  - Low opacity
  - Slow movement
  - Smooth fading in and out

Cursor Interaction:
- Background elements should gently react to mouse movement:
  - Slight parallax shift based on cursor position
  - Soft attraction or repulsion effect near the cursor
  - Smooth easing (no sharp movements)
- Movement must feel calm and premium, not playful or distracting.

Technical Guidelines:
- Use GSAP or CSS animations for smooth performance
- Throttle mouse movement updates to avoid performance issues
- Ensure animations are GPU-friendly
- Disable or reduce background animations on mobile and touch devices

Design Constraints:
- Keep animation extremely subtle
- No bright flashing colors
- No heavy 3D scenes
- Content must always remain readable and in focus

Goal:
The interactive background should add depth and polish to the entire page, creating a modern, premium feel that reacts naturally to user movement without overwhelming the design.

==============================
SUBTLE 3D BACKGROUND OBJECT
==============================

- Add a decorative 3D object in the background to enhance visual depth and modern design.
- The 3D object must remain subtle and must NOT distract from the main content.

Technology Requirements:
- Use React Three Fiber (Three.js for React)
- Optional use of Drei helpers for lighting, environment, and controls

3D Object Design:
- Use a clean, modern, developer-themed object such as:
  - Floating geometric shape (sphere, torus, abstract blob, cube cluster)
  - Glass / metallic / gradient material
- Object should have soft lighting and smooth shading
- Avoid heavy textures or high polygon models

Animation Behavior:
- Object should slowly rotate or float continuously
- Movement should feel calm and elegant
- Add gentle parallax response to mouse movement
- Add slight scale or glow effect when cursor comes near

Interaction Rules:
- Object must remain in background layer
- It must never block text or UI elements
- Object opacity or blur may reduce when content overlaps
- No clickable interaction required (purely decorative)

Performance Guidelines:
- Optimize rendering and polygon count
- Use lightweight lighting setup
- Use Suspense / lazy loading for 3D canvas
- Disable or replace 3D object on mobile and low-performance devices

Visual Constraints:
- Maintain minimal, professional aesthetic
- Avoid flashy colors or gaming-style effects
- Keep animation speed slow and smooth

Goal:
The 3D background object should add depth, creativity, and premium visual polish while keeping the portfolio professional, clean, and performance-friendly.

==============================
LEETCODE LIVE ACTIVITY & PROGRESS CHART
==============================

- Integrate a dynamic LeetCode activity visualization in the LeetCode section.
- Fetch real-time data from the LeetCode profile using an available API or GraphQL endpoint.

Display Elements:
1. Profile Overview Card:
   - Username
   - Short description:
     "Actively practicing Data Structures and Algorithms"
   - Button: "Visit LeetCode Profile" (opens profile in new tab)

2. Problem Solving Statistics:
   - Total solved problems
   - Difficulty breakdown:
     - Easy solved
     - Medium solved
     - Hard solved

3. Live Activity Chart:
   - Display a coding activity heatmap or chart similar to GitHub contribution graphs
   - Show daily / weekly problem solving activity
   - Use smooth animated chart transitions

Chart Design:
- Use a clean, professional chart layout
- Subtle hover interaction to display activity details
- Match portfolio theme colors
- Use lightweight chart libraries such as:
  - Chart.js
  - Recharts
  - Nivo Charts
  - Custom SVG heatmap

Animation Behavior:
- Animate chart loading smoothly
- Use fade-in or stagger animation when data loads

Technical Requirements:
- Fetch data dynamically from LeetCode API or third-party LeetCode stats API
- Handle loading state with skeleton loader
- Handle API failure gracefully with fallback message

Performance Constraints:
- Cache fetched data when possible
- Lazy load the chart component
- Ensure fast load time

Mobile Behavior:
- Convert chart into simplified responsive layout
- Maintain readability on smaller screens

Design Constraints:
- Keep visualization minimal and readable
- Avoid flashy or gaming-style graphics
- Maintain professional appearance

Goal:
Demonstrate active coding practice and problem-solving consistency using real-time visual analytics.
