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
LinkedIn: https://www.linkedin.com/in/dhruv-ozha-bb378639b/  
Live Project / Clone Website: https://clonewebsite-one.vercel.app/
CropPilot: https://croppilot-su.vercel.app/
AI Adaptive Onboarding Engine: https://iisc-hack.vercel.app/
Portfolio: https://dhruvozha-portfolio.vercel.app/

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

Refine and simplify the existing portfolio while maintaining a clean, modern, and professional look.

==============================

SKILLS SECTION MODIFICATION

==============================

Remove all proficiency percentages, levels, or progress bars.

Do NOT display skill levels (no %, no "advanced", no rating).

Present skills as clean icon-based cards only.

Use official or recognizable technology logos for each skill:

HTML → HTML5 logo

CSS → CSS3 logo

JavaScript → JS logo

React → React logo

MongoDB → MongoDB leaf logo

C Language → Official C language document-style icon

Each skill card should contain:

Logo

Skill name

Add subtle hover animation (scale or soft glow).

Keep layout minimal and responsive.

Goal:

Show confidence without exaggeration. Let projects demonstrate proficiency.

==============================

CERTIFICATES SECTION MODIFICATION

==============================

When clicking on a certificate card:

Open the certificate in a modal (popup overlay) within the same page.

Do NOT open in a new tab.

Modal Requirements:

Dark overlay background

Centered certificate preview

Close button (top-right corner)

Smooth fade-in animation

Close on outside click

Modal must be responsive and scrollable if needed.

Maintain professional styling consistent with the site.

Goal:

Improve UX and keep users on the same page.

==============================

RESUME SECTION SIMPLIFICATION

==============================

Reduce the size of the Resume section.

Remove the large resume card.

Remove hover-based multiple options.

Instead:

Add a single clean button labeled "View Resume"

Place this button in the Hero section

Position it below "View Projects" and "Contact" buttons

Clicking the button should open the resume link/webpage in a new tab.

Keep design minimal and professional.

Goal:

Simplify recruiter access and reduce clutter.

==============================

OVERALL DESIGN CONSTRAINTS

==============================

Maintain premium and minimalist aesthetic.

Avoid visual clutter.

Keep animations subtle.

Ensure fast loading and strong performance.

Preserve responsiveness across all devices.

FINAL OBJECTIVE:

Make the portfolio cleaner, more confident, and more product-like by removing unnecessary indicators and focusing on real skills, projects, and certifications.

make a visible box around the View resume ...like view project and contact me ..but in different style

Update my existing portfolio webpage with precise layout and content improvements while strictly preserving the current design system. Do not alter the existing color palette, typography, UI components, spacing scale, or visual theme. The goal is to improve structure, alignment, and content clarity without redesigning the interface.

🧩 Scope of Work

Only implement the changes listed below. Avoid adding new sections, removing sections, or introducing new design styles.

🎯 1. Hero Section Layout Optimization
Convert the Hero section into a two-column layout:
Left Column (Content)
Right Column (Image)
Align all Hero content (heading, subheading, description, CTA buttons) to the left side.
Ensure proper vertical alignment (centered or slightly top-balanced) depending on existing design.
Maintain consistent spacing between elements using the current spacing system.
Ensure a clear visual hierarchy:
Primary heading (most prominent)
Supporting text (secondary emphasis)
CTA buttons (clearly visible, not overcrowded)
🖼️ 2. Image Repositioning (About → Hero)
Move the profile image currently used in the About section into the right column of the Hero section.
Image Requirements:
Maintain original aspect ratio
High quality (no pixelation or distortion)
Proper alignment (centered within its container)
Should not overflow or break layout
Ensure:
Balanced spacing between text (left) and image (right)
Clean, professional composition
Responsive scaling across devices
📄 3. About Section Enhancement
Increase the height and spacing of the About section to improve readability.
Ensure the section does not feel cramped.
Maintain consistency with the existing layout system.
✍️ 4. About Section Content Structure
Add exactly 3 paragraphs in the About section.
Each paragraph must:
Be approximately 3 lines long
Be concise, meaningful, and relevant to a personal portfolio
Content Guidelines:
Paragraph 1: Introduction (who I am, what I do)
Paragraph 2: Skills / expertise / interests
Paragraph 3: Goals / mindset / passion
Ensure:
Proper line spacing
Readable font size (aligned with existing typography scale)
Balanced margins and padding
📱 5. Responsiveness Requirements
Desktop: Two-column Hero layout (text left, image right)
Tablet: Maintain structure with adjusted spacing
Mobile:
Stack layout vertically
Text appears first, image below
Maintain readability and spacing
🎨 6. Design Constraints (Strict)
❌ Do NOT change:
Colors
Fonts
Theme
UI style
Component design
✅ ONLY adjust:
Layout structure
Alignment
Spacing
Content placement
🧠 7. Final Output Expectations

The final result must:

Look clean, modern, and premium
Have strong visual balance between text and image
Feel structured and intentional (not random placement)
Avoid clutter, misalignment, or inconsistent spacing
Maintain original design identity while improving usability
⚠️ Important Instruction

Do not improvise design decisions beyond the instructions. Follow the requirements strictly and ensure pixel-level alignment consistency wherever possible.
do this
> **Remove the dark/light toggle** and replace it with a **Theme Selector Button** (🎨 palette icon + "Theme" label). When clicked, it opens a beautiful theme picker. Selecting any theme **completely transforms the entire website** — every pixel, every shadow, every glow, every font weight, every surface adapts to that theme's unique personality.
>
> ---
>
> ### 🔘 Theme Button & Picker UI
>
> - Button shows the **active theme's accent color** as a small dot/ring indicator
> - Opens a **floating glassmorphism panel** with smooth fade + slide-down animation
> - Themes displayed as **rich preview cards** in a 2–3 column grid showing:
>   - Theme name + emoji icon
>   - A **live mini-preview strip** — tiny mock navbar, body, and button in that theme's colors
>   - Active theme has a **glowing border** in its accent color + checkmark badge
> - Panel closes on outside click or `Escape` key
> - **Search/filter bar** at the top of the panel to filter themes by name
>
> ---
>
> ### 🌈 Themes to Implement (10 Unique Themes)
>
> | # | Theme | Personality |
> |---|---|---|
> | 1 | ☀️ **Light** | Clean, minimal, professional white |
> | 2 | 🌑 **Dark** | Classic deep dark with purple glow |
> | 3 | 🌊 **Ocean** | Deep navy seas, cyan waves, bioluminescent glow |
> | 4 | 🌲 **Forest** | Earthy dark greens, moss tones, amber light |
> | 5 | 🌅 **Sunset** | Warm coral, burnt orange, golden light bleeds |
> | 6 | 🍬 **Candy** | Soft pastel pink, lavender, mint freshness |
> | 7 | 🌌 **Midnight** | Deep indigo galaxy, violet nebula, stardust glow |
> | 8 | 🖤 **Monochrome** | Pure grayscale, no hue, ink and paper |
> | 9 | 🔥 **Ember** | Volcanic dark bg, molten red/orange lava accents |
> | 10 | 🌸 **Sakura** | Soft Japanese blush pink, white, gold leaf accents |
>
> ---
>
> ### ⚙️ CSS Variables — Every Theme Must Define ALL of These
>
> ```css
> [data-theme="ocean"] {
>
>   /* ── BACKGROUNDS ── */
>   --bg-root: #020c18;              /* Page root / html background */
>   --bg-primary: #041528;           /* Main body background */
>   --bg-secondary: #071e36;         /* Section / alt background */
>   --bg-card: #0a2540;              /* Card surfaces */
>   --bg-card-hover: #0d2e4e;        /* Card on hover */
>   --bg-modal: #061b32;             /* Modal / dialog background */
>   --bg-navbar: rgba(4,21,40,0.85); /* Navbar (semi-transparent blur) */
>   --bg-sidebar: #041528;           /* Sidebar background */
>   --bg-footer: #020c18;            /* Footer background */
>   --bg-input: #0a2540;             /* Input / textarea background */
>   --bg-tooltip: #0d2e4e;           /* Tooltip background */
>   --bg-dropdown: #0a2540;          /* Dropdown menus */
>   --bg-code: #031020;              /* Code blocks background */
>   --bg-badge: #0a2540;             /* Badge/tag background */
>   --bg-selection: #00b4d840;       /* Text selection highlight color */
>
>   /* ── BACKGROUND LIGHTING & ATMOSPHERIC GLOW ── */
>   --glow-primary: #00b4d8;         /* Primary glow color */
>   --glow-secondary: #0077b6;       /* Secondary glow color */
>   --bg-glow-hero: radial-gradient(ellipse 80% 60% at 50% -10%, #00b4d830, transparent);
>   --bg-glow-section: radial-gradient(ellipse 60% 40% at 80% 50%, #0077b620, transparent);
>   --bg-glow-footer: radial-gradient(ellipse 50% 60% at 20% 100%, #00b4d815, transparent);
>   --bg-noise-overlay: url("noise.svg"); /* Optional subtle noise texture */
>   --bg-grid-lines: rgba(0,180,216,0.04); /* Subtle grid overlay color */
>   --ambient-light: 0 0 120px 40px #00b4d810; /* Box shadow ambient light effect */
>   --hero-spotlight: radial-gradient(circle at 50% 40%, #00b4d818 0%, transparent 70%);
>
>   /* ── TEXT & TYPOGRAPHY ── */
>   --text-primary: #e0f4ff;         /* Main body text */
>   --text-secondary: #90c8e0;       /* Secondary / supporting text */
>   --text-muted: #4a7a94;           /* Placeholder, captions, hints */
>   --text-disabled: #2a4a5a;        /* Disabled state text */
>   --text-inverse: #020c18;         /* Text on accent/light backgrounds */
>   --text-heading: #ffffff;         /* H1, H2, H3 headings */
>   --text-link: #00b4d8;            /* Hyperlinks */
>   --text-link-hover: #48cae4;      /* Link hover */
>   --text-code: #7de8ff;            /* Inline code text */
>   --text-highlight: #00b4d8;       /* Highlighted/marked text color */
>   --text-error: #ff6b6b;
>   --text-success: #52e3a4;
>   --text-warning: #ffd166;
>
>   /* ── TYPOGRAPHY STYLE ── */
>   --font-family-heading: 'Inter', 'Sora', sans-serif;
>   --font-family-body: 'Inter', 'DM Sans', sans-serif;
>   --font-family-mono: 'JetBrains Mono', 'Fira Code', monospace;
>   --font-weight-heading: 700;      /* Heading boldness per theme */
>   --font-weight-body: 400;
>   --font-weight-emphasis: 600;
>   --letter-spacing-heading: -0.03em;
>   --letter-spacing-body: 0.01em;
>   --line-height-body: 1.75;
>   --text-rendering: optimizeLegibility;
>
>   /* ── ACCENT & BRAND COLORS ── */
>   --accent-primary: #00b4d8;       /* Main brand/accent color */
>   --accent-secondary: #0077b6;     /* Secondary accent */
>   --accent-tertiary: #48cae4;      /* Tertiary accent / highlights */
>   --accent-subtle: #00b4d810;      /* Very subtle accent tint for backgrounds */
>   --accent-muted: #005f7a;         /* Muted accent for less emphasis */
>
>   /* ── BUTTONS ── */
>   --btn-primary-bg: #00b4d8;
>   --btn-primary-text: #020c18;
>   --btn-primary-hover-bg: #48cae4;
>   --btn-primary-shadow: 0 4px 20px #00b4d840;
>   --btn-primary-hover-shadow: 0 6px 30px #00b4d860;
>   --btn-secondary-bg: transparent;
>   --btn-secondary-text: #00b4d8;
>   --btn-secondary-border: #00b4d8;
>   --btn-secondary-hover-bg: #00b4d815;
>   --btn-ghost-text: #90c8e0;
>   --btn-ghost-hover-bg: #0a2540;
>   --btn-disabled-bg: #0a2540;
>   --btn-disabled-text: #2a4a5a;
>   --btn-border-radius: 8px;
>   --btn-font-weight: 600;
>   --btn-letter-spacing: 0.03em;
>   --btn-glow-effect: 0 0 20px #00b4d850; /* Glow on hover */
>
>   /* ── BORDERS & DIVIDERS ── */
>   --border-color: #0d2e4e;
>   --border-color-strong: #1a4060;
>   --border-color-subtle: #071e3640;
>   --border-accent: #00b4d840;
>   --border-radius-sm: 6px;
>   --border-radius-md: 12px;
>   --border-radius-lg: 20px;
>   --border-radius-pill: 9999px;
>   --divider-color: #0d2e4e;
>
>   /* ── SHADOWS & DEPTH ── */
>   --shadow-sm: 0 2px 8px #00050a60;
>   --shadow-md: 0 4px 20px #00050a80;
>   --shadow-lg: 0 10px 40px #00050a90;
>   --shadow-xl: 0 20px 60px #00050aa0;
>   --shadow-glow: 0 0 30px #00b4d825;
>   --shadow-inset: inset 0 1px 0 #00b4d815;
>   --shadow-card: 0 4px 24px #00050a70, 0 0 0 1px #0d2e4e;
>   --shadow-navbar: 0 4px 30px #00050a90, 0 0 60px #00b4d808;
>   --shadow-btn: 0 4px 14px #00b4d835;
>   --shadow-input-focus: 0 0 0 3px #00b4d825;
>
>   /* ── INPUTS & FORMS ── */
>   --input-bg: #0a2540;
>   --input-border: #1a4060;
>   --input-border-focus: #00b4d8;
>   --input-text: #e0f4ff;
>   --input-placeholder: #4a7a94;
>   --input-shadow-focus: 0 0 0 3px #00b4d820;
>   --input-border-radius: 8px;
>   --label-color: #90c8e0;
>   --checkbox-accent: #00b4d8;
>   --toggle-track-bg: #0a2540;
>   --toggle-thumb-bg: #00b4d8;
>
>   /* ── NAVBAR ── */
>   --navbar-bg: rgba(4,21,40,0.85);
>   --navbar-blur: blur(20px);
>   --navbar-border-bottom: 1px solid #0d2e4e;
>   --navbar-shadow: 0 4px 30px #00050a80;
>   --navbar-text: #e0f4ff;
>   --navbar-link-hover: #00b4d8;
>   --navbar-link-active: #00b4d8;
>   --navbar-link-active-bg: #00b4d815;
>
>   /* ── CARDS ── */
>   --card-bg: #0a2540;
>   --card-border: 1px solid #0d2e4e;
>   --card-shadow: 0 4px 24px #00050a70;
>   --card-hover-shadow: 0 8px 40px #00050a90, 0 0 20px #00b4d815;
>   --card-hover-border: 1px solid #00b4d840;
>   --card-border-radius: 16px;
>   --card-glow-hover: 0 0 30px #00b4d815;
>
>   /* ── SCROLLBAR ── */
>   --scrollbar-track: #041528;
>   --scrollbar-thumb: #0d2e4e;
>   --scrollbar-thumb-hover: #00b4d8;
>
>   /* ── MISCELLANEOUS ── */
>   --skeleton-base: #0a2540;
>   --skeleton-shine: #0d2e4e;
>   --overlay-bg: rgba(2,12,24,0.85);
>   --backdrop-blur: blur(16px);
>   --progress-bar-bg: #0a2540;
>   --progress-bar-fill: #00b4d8;
>   --table-header-bg: #071e36;
>   --table-row-alt: #0a254008;
>   --table-border: #0d2e4e;
>   --tag-bg: #00b4d815;
>   --tag-text: #00b4d8;
>   --tag-border: #00b4d830;
>   --avatar-ring: #00b4d8;
>   --icon-color: #90c8e0;
>   --icon-accent: #00b4d8;
>   --hr-color: #0d2e4e;
>   --focus-ring: 0 0 0 3px #00b4d840;
>   --transition-theme: background-color 0.35s ease, color 0.25s ease,
>                        border-color 0.35s ease, box-shadow 0.35s ease,
>                        fill 0.25s ease, stroke 0.25s ease;
> }
> ```
>
> ---
>
> ### 🏗️ Technical Implementation Rules
>
> **1. Apply theme via HTML attribute:**
> ```js
> document.documentElement.setAttribute('data-theme', 'ocean');
> localStorage.setItem('selectedTheme', 'ocean');
> ```
>
> **2. On page load — no flicker:**
> ```html
> <!-- In <head>, before any CSS loads -->
> <script>
>   const t = localStorage.getItem('selectedTheme') || 'light';
>   document.documentElement.setAttribute('data-theme', t);
> </script>
> ```
>
> **3. Global smooth transition on every element:**
> ```css
> *, *::before, *::after {
>   transition: var(--transition-theme);
> }
> ```
>
> **4. Background atmospheric lighting on `<body>`:**
> ```css
> body {
>   background-color: var(--bg-primary);
>   background-image: var(--bg-glow-hero), var(--bg-glow-section);
>   background-attachment: fixed;
>   color: var(--text-primary);
>   font-family: var(--font-family-body);
>   line-height: var(--line-height-body);
> }
> ```
>
> **5. Custom scrollbar per theme:**
> ```css
> ::-webkit-scrollbar { width: 8px; }
> ::-webkit-scrollbar-track { background: var(--scrollbar-track); }
> ::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); border-radius: 99px; }
> ::-webkit-scrollbar-thumb:hover { background: var(--scrollbar-thumb-hover); }
> ```
>
> **6. Text selection color per theme:**
> ```css
> ::selection { background: var(--bg-selection); color: var(--text-primary); }
> ```
>
> ---
>
> ### ✅ Full Acceptance Checklist
>
> - [ ] Toggle removed, theme button added in same position
> - [ ] Panel opens with smooth animation, closes on outside click / `Escape`
> - [ ] All 10 themes implemented with full variable sets
> - [ ] **Backgrounds** — root, body, cards, modals, navbar, footer all update
> - [ ] **Atmospheric lighting** — radial glows, spotlights, ambient light change per theme
> - [ ] **Typography** — font family, weight, letter spacing, line height adapt per theme
> - [ ] **Text colors** — primary, secondary, muted, headings, links all change
> - [ ] **Buttons** — primary, secondary, ghost, disabled all update including glow/shadow
> - [ ] **Inputs & forms** — bg, border, focus ring, labels, placeholders all themed
> - [ ] **Cards** — bg, border, shadow, hover glow all themed
> - [ ] **Navbar** — bg blur, border, shadow, link colors all themed
> - [ ] **Scrollbar** — track, thumb, hover all themed
> - [ ] **Icons & SVGs** — color adapts via CSS variable fill/stroke
> - [ ] **Shadows** — depth and glow shadows all themed (no hardcoded `rgba` black)
> - [ ] **Skeleton loaders, overlays, tooltips, dropdowns, badges, tags** — all themed
> - [ ] **Smooth transition** on every property when switching themes
> - [ ] **No flicker** on page reload (theme applied before paint)
> - [ ] **Active theme** visually highlighted in picker with glow border + checkmark
> - [ ] **Zero hardcoded colors** anywhere — 100% CSS variable driven
in portfolio
Here's your detailed prompt:

---

**🎨 AI Image / Background Generation Prompt:**

> A futuristic tech website background featuring **abstract 3D geometric shapes** — low-poly wireframe pyramids, floating hexagonal prisms, translucent octahedrons, and shattered polygon fragments suspended in deep space. The shapes are interconnected by glowing thin neon lines suggesting a neural network or data grid. Color palette: **deep midnight navy (#0a0f2c) base**, with glowing accents in **electric cyan (#00f0ff), violet (#7b2fff), and cool white**. Shapes have a glass-morphism / holographic sheen with subtle reflections and depth-of-field blur on distant elements. Soft volumetric fog between layers adds depth. The composition is **asymmetric and layered** — denser clusters on left and bottom, fading to sparse on the right for text readability. Lighting: rim-lit from top-left with a subtle lens flare. Style: **ultra-realistic 3D render, Blender/Cinema4D aesthetic, 8K, dark tech UI background, no text, no people.**

---

**🛠️ Where to use this prompt:**

| Tool | Best For |
|---|---|
| **Midjourney** | Highest visual quality |
| **DALL·E 3** | Quick iterations |
| **Adobe Firefly** | Commercial-safe use |
| **Leonardo.AI** | Fine-tuned control |
| **Stable Diffusion** | Free + customizable |

---

**💡 Tip:** Add `--ar 16:9` at the end for Midjourney to get a widescreen website banner ratio, or `--ar 1:1` for a square section background.

Want me to also **build this directly as an animated Three.js background** for your website instead?

<!--  Voice Command Prompt -->
**Objective:**
Upgrade the existing `VoiceAssistant.tsx` in my Vite + React (TypeScript) portfolio. I want to transform it from a basic assistant into a fully integrated, command-driven AI that can navigate the portfolio, open external links, click buttons on the UI, and fill out the "Contact Me" form using voice dictation.

**Core Requirements:**

We will use the native Web Speech API (`window.SpeechRecognition` or `window.webkitSpeechRecognition`) for speech-to-text, and `window.speechSynthesis` for text-to-speech to acknowledge commands.

Please implement the following 3 major feature sets:

### 1. External Link Navigation
The assistant must listen for intent keywords like "open", "go to", or "visit", and map them to my external profiles.
*   **Commands:** "Open GitHub", "Visit my LinkedIn", "Go to YouTube", "Open Twitter", "Show me LeetCode", "Open Instagram".
*   **Action:** Acknowledge the command vocally (e.g., "Opening your GitHub profile") and use `window.open(url, '_blank')` to open the corresponding link in a new tab.
*   **Mapping:** 
    * GitHub: `https://github.com/DhruvOzha85`
    * LinkedIn: `https://www.linkedin.com/in/dhruv-ozha-bb378639b/`
    * YouTube: `https://www.youtube.com/@DhruvOzha`
    * LeetCode: `https://leetcode.com/u/DhruvOzha/`
    * Twitter/X: `https://x.com/dhruvozha85`
    * Instagram: `https://www.instagram.com/dhruv.ozha/`

### 2. UI Interaction & Button Clicking
The assistant must be able to visually "click" buttons or scroll to sections within the portfolio based on voice commands.
*   **Commands:** "Open CropPilot demo", "View Live Project", "Go to Skills", "Show me Projects", "View Resume".
*   **Action:** 
    * For section scrolling commands ("Show me Projects"), use `document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })`.
    * For dynamic buttons ("Open CropPilot demo"), the assistant should scan the DOM for matching elements. Specifically, update my project cards / buttons to include a `data-voice-target` attribute (e.g., `data-voice-target="croppilot-demo"`). The assistant will do: `document.querySelector('[data-voice-target="croppilot-demo"]').click()`.
*   **Feedback:** The speaker should say, "Opening CropPilot demo" when executed successfully.

### 3. Contact Form Voice Dictation Mode
I want to be able to dictate my messages directly into the contact form.
*   **Trigger Commands:** "Write a message", "Fill contact form", "Start dictation".
*   **Action:** 
    1. The assistant responds, "I am listening. What would you like to say in the message?"
    2. The assistant enters a specific `isDictating` state.
    3. Any speech detected while in `isDictating` state is automatically appended to the `message` field (textarea) of the `ContactSection` form.
    4. You should use a global state (e.g., Zustand or React Context) or dispatch a custom window event (`window.dispatchEvent(new CustomEvent('voice-dictation', { detail: transcript }))`) so the Contact form can listen and update its `react-hook-form` value or local state.
*   **End Command:** "Stop dictation" or "End message". The assistant responds, "Dictation completed."

### Technical Implementation Steps & Constraints:

1. **Robust Intent Parsing:** Create a helper function `parseCommand(transcript: string)` that converts speech to lowercase and removes punctuation before matching against command maps. Use RegEx or `includes()` checks to account for variations (e.g., "open github" vs "please open github").
2. **Audio Feedback (TTS):** Create a helper `speak(text: string)` using `speechSynthesis.speak(new SpeechSynthesisUtterance(text))` to confirm actions. Ensure it doesn't overlap with listening.
3. **Fuzzy Matching for Projects:** If I say "open crop pilot demo" or "open croppilot demo", map both variations to the same data target.
4. **Graceful Failures:** If a command is not understood, the assistant should say, "I didn't catch that. You can ask me to open links, view projects, or write a message."
5. **UI Indicator:** Ensure the Voice Assistant UI component (likely a floating mic button) visually pulses or changes color to indicate when it is actively listening vs actively dictating into the form.

Please provide the updated `VoiceAssistant.tsx` file incorporating this logic, along with instructions on what minor attributes need to be added to my `ContactSection` textarea and `ProjectsSection` buttons to make the connection complete.