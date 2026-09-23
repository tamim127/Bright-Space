# Premium Awwwards-Style Scroll Animation Prompt

I already have a complete portfolio website in this project.

IMPORTANT:
Do NOT redesign the website.
Do NOT replace the current layout, content, typography, colors, images, sections, navigation, or responsive structure.

Your job is to upgrade the existing website with a premium, cinematic, Awwwards-level scrolling experience.

The goal is NOT to add random animations.
The goal is to make scrolling itself feel like part of the design.

---

## 1. FIRST: INSPECT THE EXISTING WEBSITE

Before changing anything:

- Inspect the complete project structure.
- Identify every major section.
- Identify all section IDs/classes.
- Understand the current responsive behavior.
- Understand existing navigation and interactions.
- Identify which elements can safely be animated.
- Do not guess the DOM structure.
- Do not rebuild components unnecessarily.

Create a clear animation plan internally before implementing it.

---

# 2. ANIMATION TECHNOLOGY

Use:

- GSAP
- GSAP ScrollTrigger
- Lenis for smooth scrolling

If these libraries are already installed, reuse the existing setup.

Use modern GSAP patterns.

Prefer:

- transform
- opacity
- scale
- rotation
- clip-path
- translate
- CSS variables

Avoid expensive continuous animations involving:

- width
- height
- top
- left
- box-shadow
- large blur/filter animations

The website must remain smooth and performant.

---

# 3. SMOOTH SCROLLING

Implement premium smooth scrolling using Lenis.

Scrolling should feel:

- smooth
- responsive
- natural
- slightly cinematic
- not slow or floaty
- not disconnected from user input

Do NOT make scrolling so slow that the website feels difficult to navigate.

Integrate Lenis correctly with GSAP ScrollTrigger.

Make sure ScrollTrigger refreshes correctly after page load and after dynamic content/images are ready.

---

# 4. GLOBAL SCROLL PHILOSOPHY

Every section should have its own motion language.

Do NOT make every section use the same:

"fade in + slide up"

animation.

Instead use a combination of:

- reveal
- parallax
- scale
- pinning
- masking
- stagger
- horizontal movement
- image zoom
- text transformation
- section transitions
- background movement

Animations should feel connected from one section to another.

The page should feel like one continuous visual journey.

---

# 5. HERO SECTION

Make the hero feel cinematic.

On scroll:

- Main heading should gradually scale down.
- Heading can slightly move vertically.
- Supporting text should fade/move naturally.
- Hero visual/image should have subtle parallax.
- Background elements should move at different speeds.
- Decorative elements should respond subtly to scroll.
- Hero should gradually transition into the next section.

Do NOT make the hero disappear instantly.

The transition should feel intentional.

If appropriate, use a pinned hero section with scrub-based animation.

---

# 6. TEXT REVEAL SYSTEM

For important headings, create premium text reveals.

Use techniques such as:

- clip-path
- overflow hidden
- translateY
- staggered word/line reveal

Example behavior:

Heading starts:

opacity: 0
translateY: 100%

Then while entering the viewport:

translateY → 0
opacity → 1

For large display typography, allow subtle movement during scrolling.

Do NOT animate every small text element.

Prioritize:

- section headings
- hero typography
- major statements
- project titles

---

# 7. ABOUT SECTION

Create a subtle storytelling animation.

When the section enters:

- heading reveals
- paragraph reveals progressively
- image moves with subtle parallax
- secondary elements appear with stagger

Use different movement speeds for foreground and background elements.

The effect should be subtle and premium.

---

# 8. SERVICES SECTION

Do NOT simply fade the service cards upward.

Create a more sophisticated interaction.

Possible behavior:

- Section heading reveals first.
- Cards enter with stagger.
- Cards have subtle scale/translation.
- Cards react slightly to scroll progress.
- Background elements move independently.
- Hover interactions should remain intact.

If there are multiple service cards, make their entrance feel choreographed rather than simultaneous.

---

# 9. PROJECT / WORK SECTION

This should be one of the strongest sections.

Create a cinematic project presentation.

Preferred behavior:

VERTICAL SCROLL
↓
PROJECT SECTION PINNED
↓
PROJECT CONTENT MOVES HORIZONTALLY
↓
PROJECT IMAGE / CONTENT TRANSFORMS
↓
NEXT PROJECT
↓
FINAL PROJECT
↓
SECTION RELEASES

Use GSAP ScrollTrigger with pin + scrub.

The horizontal movement must be controlled by vertical scrolling.

Do NOT make it behave like a normal horizontal carousel.

The user should feel like the page is temporarily transforming direction.

Project images should have:

- subtle scale
- parallax
- clipping/reveal
- smooth transitions

Project titles and metadata should animate in sync with the project movement.

After the final project, smoothly transition back into normal vertical scrolling.

---

# 10. SECTION TRANSITIONS

Create visual continuity between sections.

Use subtle:

- scale transitions
- background movement
- image overlap
- clip-path reveals
- typography transformations
- color/background transitions where compatible with the existing design

Avoid abrupt section changes.

The user should feel that each section is connected to the previous one.

---

# 11. IMAGE PARALLAX

Add subtle parallax to large images.

Different elements should move at slightly different speeds.

Example:

Background image:
slow movement

Main image:
medium movement

Foreground decoration:
slightly faster movement

Keep the movement subtle.

Do NOT create excessive floating effects.

---

# 12. PINNED SECTIONS

Use pinning only where it improves storytelling.

Good candidates:

- Hero
- Project showcase
- Major visual storytelling section

Do NOT pin every section.

Pinned sections must release smoothly and must not create:

- blank gaps
- jumpy scrolling
- incorrect section heights
- mobile layout issues

---

# 13. MOBILE EXPERIENCE

This is extremely important.

Do NOT blindly use the desktop animation system on mobile.

For mobile:

- reduce animation distances
- reduce parallax intensity
- reduce pinning where necessary
- disable complex horizontal sections if they hurt usability
- maintain natural touch scrolling
- preserve performance

Mobile should still feel premium.

---

# 14. REDUCED MOTION

Respect:

prefers-reduced-motion

If the user has reduced motion enabled:

- disable complex parallax
- disable unnecessary pinning
- minimize transforms
- keep content accessible and visible

---

# 15. PERFORMANCE

The animation system must be production quality.

Target smooth scrolling and high frame-rate performance.

Use:

- transform
- opacity
- GPU-friendly properties
- will-change only where appropriate

Do not abuse will-change.

Avoid creating hundreds of ScrollTriggers unnecessarily.

Use reusable animation functions.

Make sure ScrollTrigger instances are properly managed.

---

# 16. RESPONSIVE BREAKPOINTS

The animation system must adapt to:

- Desktop
- Laptop
- Tablet
- Mobile

Do not assume desktop dimensions.

Use responsive GSAP logic where appropriate.

For example:

desktop animation:
large movement

tablet:
medium movement

mobile:
small movement or simplified animation

---

# 17. NAVIGATION

Do NOT break the existing navigation.

If the website has anchor navigation:

- navigation should still scroll correctly
- smooth scrolling should work
- active states should remain functional
- clicking a navigation item should not conflict with Lenis
- ScrollTrigger should not interfere with anchor positioning

---

# 18. LOADING / INITIALIZATION

Do not start complex animations before the page layout is ready.

Make sure:

- fonts are loaded
- images are accounted for
- layout is stable
- ScrollTrigger refreshes after assets load

Avoid layout shift.

---

# 19. IMPORTANT DESIGN RULE

This is NOT a request for "more animations."

It is a request for a premium scrolling experience.

The animation should communicate:

- hierarchy
- storytelling
- depth
- movement
- progression
- visual continuity

Every animation must have a reason.

If an animation does not improve the experience, remove it.

---

# 20. CODE ARCHITECTURE

Keep the animation code modular.

Create separate animation functions such as:

initSmoothScroll()
initHeroAnimation()
initTextReveals()
initAboutAnimation()
initServicesAnimation()
initProjectsAnimation()
initParallax()
initSectionTransitions()

Do not put the entire animation system into one giant function.

Use clear naming and comments where necessary.

---

# 21. VERY IMPORTANT: DO NOT DESTROY EXISTING FUNCTIONALITY

After implementing animations, verify that these still work:

- Navigation
- Buttons
- Links
- Forms
- Project links
- Mobile menu
- Responsive layout
- Hover effects
- Existing interactions
- Images
- Typography

Do not modify existing functionality unless required for the animation system.

---

# 22. FINAL QUALITY CHECK

After implementation, test the entire website from top to bottom.

Check:

1. Initial page load
2. Hero scroll
3. Section transitions
4. Text reveals
5. Services
6. Project section
7. Horizontal project scrolling
8. Parallax
9. Footer
10. Navigation
11. Mobile
12. Tablet
13. Desktop
14. Fast scrolling
15. Slow scrolling
16. Trackpad scrolling
17. Touch scrolling
18. Browser resize

Fix any:

- jitter
- flickering
- jumps
- blank spaces
- incorrect pin spacing
- overlapping sections
- ScrollTrigger refresh problems
- mobile overflow
- horizontal scrollbar issues

---

## FINAL OBJECTIVE

I want the existing portfolio to feel like a high-end creative developer / digital agency website featured on Awwwards.

The visual design already exists.

Do not redesign it.

Transform the EXPERIENCE through:

smooth scrolling
+
scroll-driven motion
+
cinematic transitions
+
parallax
+
text reveals
+
pinned storytelling
+
horizontal project presentation
+
responsive motion
+
high performance

The final result should feel sophisticated, intentional, smooth and expensive.

Do not add animations just for the sake of animation.

Make the scrolling experience the main interaction of the website.
