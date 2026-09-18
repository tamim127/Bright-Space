export interface TechCategory {
  category: string;
  items: {
    name: string;
    description: string;
    badge: string;
  }[];
}

export const techStackData: TechCategory[] = [
  {
    category: "Frontend & UI",
    items: [
      { name: "Next.js 15", description: "Server components, App Router & SSG/ISR", badge: "Framework" },
      { name: "React 19", description: "Modern reactive UI architecture", badge: "UI Library" },
      { name: "TypeScript", description: "Strict static typing for robust codebases", badge: "Language" },
      { name: "Tailwind CSS v4", description: "Utility-first modern styling engine", badge: "Styling" },
      { name: "Framer Motion & GSAP", description: "Smooth 60fps animations & transitions", badge: "Animation" }
    ]
  },
  {
    category: "Backend & APIs",
    items: [
      { name: "Node.js & Express", description: "High-throughput asynchronous servers", badge: "Runtime" },
      { name: "REST & GraphQL APIs", description: "Clean decoupled API architecture", badge: "API" },
      { name: "Serverless Edge Functions", description: "Global low-latency edge deployment", badge: "Cloud" }
    ]
  },
  {
    category: "Databases & Storage",
    items: [
      { name: "MongoDB", description: "Flexible document-based storage", badge: "NoSQL" },
      { name: "PostgreSQL", description: "ACID compliant relational database", badge: "SQL" },
      { name: "Redis", description: "Ultra-fast in-memory caching layer", badge: "Cache" }
    ]
  },
  {
    category: "Cloud & Infrastructure",
    items: [
      { name: "Vercel", description: "Automated CI/CD edge hosting platform", badge: "Deployment" },
      { name: "AWS Cloud", description: "Scalable S3, EC2 & Lambda infrastructure", badge: "Infrastructure" },
      { name: "Stripe", description: "Global payment processing integration", badge: "Payments" },
      { name: "Resend", description: "Reliable transactional email platform", badge: "Communications" }
    ]
  }
];
