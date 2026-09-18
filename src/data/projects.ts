export interface Project {
  id: string;
  title: string;
  category: "Websites" | "Web Apps" | "SaaS" | "E-commerce" | "Software";
  subcategory: string;
  tagline: string;
  description: string;
  image: string;
  client: string;
  timeline: string;
  servicesProvided: string[];
  challenge: string;
  solution: string;
  goals: string[];
  techStack: string[];
  results: {
    label: string;
    value: string;
  }[];
  featured: boolean;
}

export const projectsData: Project[] = [
  {
    id: "nexus-saas-platform",
    title: "Nexus Enterprise SaaS",
    category: "SaaS",
    subcategory: "FinTech • Web Application",
    tagline: "Next-gen workflow automation and analytics platform for enterprise teams",
    description: "Built a high-throughput financial analytics dashboard with real-time web-socket telemetry, role-based access control, and automated billing integration.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    client: "Nexus Global Inc.",
    timeline: "3 Months",
    servicesProvided: ["UI/UX Design", "Next.js App", "Node.js Backend", "MongoDB Cluster"],
    challenge: "The client faced legacy reporting latency exceeding 12 seconds per query, with fragmented permissions and complex non-intuitive UI.",
    solution: "Engineered a modernized App Router Next.js architecture integrated with cached Redis layers and custom micro-chart visualization engine.",
    goals: [
      "Reduce query latency below 300ms",
      "Modernize workspace UI with dark luxury aesthetic",
      "Automate multi-tier client onboarding workflow",
      "Seamless Stripe & Plaid payment API integrations"
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB", "Redis", "Framer Motion"],
    results: [
      { label: "Query Speed", value: "98% Faster" },
      { label: "User Retention", value: "+44%" },
      { label: "Workflow Processing", value: "3.5x Speed" }
    ],
    featured: true
  },
  {
    id: "aurora-digital-commerce",
    title: "Aurora Luxury E-Commerce",
    category: "E-commerce",
    subcategory: "Headless Commerce • Web Design",
    tagline: "Ultra-fast headless luxury lifestyle store with dynamic interactive 3D previews",
    description: "Designed and developed an immersive digital flagship store with frictionless checkout, interactive customizer, and lightning-fast page transitions.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    client: "Aurora Paris",
    timeline: "2.5 Months",
    servicesProvided: ["Brand System", "UI/UX Prototyping", "Headless Next.js", "Stripe API"],
    challenge: "High cart abandonment rates due to slow mobile load speeds on monolithic legacy platform.",
    solution: "Created a decoupled Headless Next.js architecture with edge-side rendered catalog pages and instantaneous client routing.",
    goals: [
      "Sub-second page load times globally",
      "Increase mobile conversion rate",
      "Integrate multi-currency automated checkout",
      "Elevate brand perception through high-end micro-interactions"
    ],
    techStack: ["Next.js 15", "React 19", "Tailwind CSS", "Shopify Storefront API", "GSAP"],
    results: [
      { label: "Conversion Rate", value: "+52%" },
      { label: "Mobile Page Speed", value: "99/100" },
      { label: "Cart Abandonment", value: "-38%" }
    ],
    featured: true
  },
  {
    id: "pulse-crm-automation",
    title: "Pulse Custom CRM & Automation",
    category: "Software",
    subcategory: "Custom Software • Internal Tools",
    tagline: "Custom operations portal streamlining multi-channel customer leads and pipeline",
    description: "Developed a custom internal software tool unifying customer support tickets, automated lead routing, and revenue forecasting into a single operational interface.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
    client: "Pulse Media Tech",
    timeline: "4 Months",
    servicesProvided: ["Software Architecture", "Custom Dashboard", "API Integrations", "QA & Support"],
    challenge: "Manual spreadsheet data entry causing 40+ hours per week in redundant staff overhead.",
    solution: "Designed a centralized custom CRM platform with rule-based automated lead distribution and real-time activity feeds.",
    goals: [
      "Eliminate manual data synchronization between departments",
      "Automate client follow-up email notifications",
      "Provide executive dashboard with live ROI metrics"
    ],
    techStack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
    results: [
      { label: "Manual Hours Saved", value: "45 hrs/wk" },
      { label: "Lead Response Time", value: "-75%" },
      { label: "Team Productivity", value: "+60%" }
    ],
    featured: true
  },
  {
    id: "vertex-ai-portal",
    title: "Vertex AI Developer Platform",
    category: "Web Apps",
    subcategory: "Web Application • Cloud Portal",
    tagline: "Intuitive portal for configuring, testing, and monitoring custom AI language models",
    description: "An intuitive web application empowering developers to deploy custom AI endpoints, test prompts, and monitor API token usage in real time.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
    client: "Vertex Systems",
    timeline: "3 Months",
    servicesProvided: ["UX Research", "Web Application", "REST API Development", "Cloud Architecture"],
    challenge: "Complex developer command-line workflows prevented non-technical stakeholders from managing model parameters.",
    solution: "Engineered a responsive, high-performance web console featuring live syntax highlighting, payload playgrounds, and visual usage graphs.",
    goals: [
      "Simplify AI prompt engineering workflows",
      "Real-time token analytics visualizer",
      "Role-based organization permissions"
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Python API", "PostgreSQL"],
    results: [
      { label: "Active Developers", value: "10,000+" },
      { label: "API Uptime", value: "99.99%" },
      { label: "Workflow Efficiency", value: "2.4x" }
    ],
    featured: false
  },
  {
    id: "horizon-corporate-site",
    title: "Horizon Capital Web Experience",
    category: "Websites",
    subcategory: "Corporate Website • Web Design",
    tagline: "Futuristic corporate site showcasing investment portfolio and leadership vision",
    description: "A dark minimal digital presence crafted for a venture capital firm, featuring fluid GSAP animations, subtle glass visual cards, and interactive portfolio filters.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    client: "Horizon Capital Partners",
    timeline: "1.5 Months",
    servicesProvided: ["Web Design", "Frontend Engineering", "Content Strategy", "SEO Optimization"],
    challenge: "Outdated website did not reflect the firm's focus on groundbreaking tech startups.",
    solution: "Created a modern dark-tech website highlighting portfolio companies with dynamic hover states and interactive investment thesis sections.",
    goals: [
      "Establish authoritative digital positioning",
      "Highlight multi-million dollar fund investments",
      "Seamless mobile & tablet responsiveness"
    ],
    techStack: ["Next.js", "Tailwind CSS", "GSAP", "Framer Motion"],
    results: [
      { label: "Inbound Pitch Rate", value: "+80%" },
      { label: "Avg Session Duration", value: "4m 12s" },
      { label: "Lighthouse Performance", value: "100/100" }
    ],
    featured: false
  }
];
