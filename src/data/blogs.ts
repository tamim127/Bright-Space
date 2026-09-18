export interface BlogPost {
  slug: string;
  title: string;
  category: "Development" | "Design" | "Technology" | "Business" | "Case Studies";
  readTime: string;
  date: string;
  excerpt: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: string;
}

export const blogsData: BlogPost[] = [
  {
    slug: "building-scalable-nextjs-web-applications",
    title: "How We Build Scalable, Production-Grade Next.js Applications in 2026",
    category: "Development",
    readTime: "8 min read",
    date: "Sep 02, 2026",
    excerpt: "An inside look at our Next.js App Router architecture, caching strategies, and performance optimization workflows.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    author: {
      name: "Alex Vance",
      role: "Founder & Lead Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
    },
    content: `
Building software products for ambitious clients requires balancing feature speed with bulletproof code architecture. 

In this article, we break down our exact methodology for architecting Next.js 15 applications:

### 1. Server Components vs Client Boundary Discipline
We strictly keep client component state localized to the interactive leaves of our DOM tree. Keeping page data fetching inside Server Components eliminates redundant client bundle sizes.

### 2. Tailored Theme Tokens & Zero-Unused Utility CSS
By using inline CSS custom properties alongside Tailwind v4, we maintain absolute dark-mode visual control while staying lightweight.

### 3. Edge Data Caching & Revalidation
We leverage stale-while-revalidate patterns for dynamic catalogs and real-time dashboard data.
    `
  },
  {
    slug: "the-art-of-dark-minimal-ui-design",
    title: "The Secrets Behind Dark Minimal Luxury UI Design",
    category: "Design",
    readTime: "6 min read",
    date: "Aug 24, 2026",
    excerpt: "Why neon glows everywhere ruin visual hierarchy and how restraint creates true premium digital products.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    author: {
      name: "Elena Rostova",
      role: "Head of Product Design",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop"
    },
    content: `
Many agencies try to make dark websites 'cool' by slapping heavy neon borders, endless glass cards, and distracting particles everywhere.

True luxury and technical authority come from **restraint**.

### The 70-20-10 Visual Rule
- **70% Minimal Dark Space**: Generous negative padding allows typography to breathe.
- **20% High-Contrast Imagery**: Premium product UI screenshots that prove capability.
- **10% Electric Accent**: Subtle electric indigo or cyan highlights reserved strictly for primary interactive CTAs.
    `
  },
  {
    slug: "why-custom-software-outperforms-saas-hacks",
    title: "Why Ambitious Businesses Are Replacing Off-the-Shelf SaaS with Custom Software",
    category: "Business",
    readTime: "7 min read",
    date: "Aug 15, 2026",
    excerpt: "How custom internal tools eliminate monthly seat costs and streamline proprietary operations.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
    author: {
      name: "Marcus Chen",
      role: "Senior Full-Stack Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    },
    content: `
Off-the-shelf software gets companies started fast, but as team size scales to 50+, licensing 10 separate SaaS tools with clunky Zapier integrations creates data silos and exorbitant monthly overhead.

Custom internal software built specifically for your workflow gives your team an unfair operational speed advantage.
    `
  }
];
