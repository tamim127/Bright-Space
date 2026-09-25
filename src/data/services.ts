export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  categoryTag: string;
  description: string;
  capabilities: string[];
  tags: string[];
  image: string;
  icon: string;
  featured: boolean;
  metricsBadge?: {
    title: string;
    score: string;
    items: { label: string; value: string }[];
  };
  floatingBadge?: {
    title: string;
    subtitle: string;
  };
}

export const servicesData: ServiceItem[] = [
  {
    id: "web-design-dev",
    number: "01",
    title: "Website Design &\nDevelopment",
    categoryTag: "WEBSITE DESIGN & DEVELOPMENT",
    description:
      "Custom corporate websites, high-converting landing pages, and interactive digital experiences engineered for maximum conversion and speed.",
    capabilities: [
      "Corporate Websites",
      "Landing Pages",
      "Portfolio Websites",
      "Headless E-commerce",
      "CMS Websites (Sanity / Next.js)",
      "Performance & SEO Optimization",
    ],
    tags: ["MODERN", "FAST", "RESPONSIVE"],
    image: "/images/services/01-web-design.jpg",
    icon: "Layout",
    featured: true,
    metricsBadge: {
      title: "Lighthouse Score",
      score: "98",
      items: [
        { label: "Performance", value: "98" },
        { label: "Accessibility", value: "100" },
        { label: "Best Practices", value: "100" },
        { label: "SEO", value: "92" },
      ],
    },
    floatingBadge: {
      title: "Responsive Design",
      subtitle: "Mobile • Tablet • Desktop",
    },
  },
  {
    id: "web-applications",
    number: "02",
    title: "Web Application\nDevelopment",
    categoryTag: "WEB APPLICATION DEVELOPMENT",
    description:
      "Scalable dashboards, SaaS platforms, internal management portals, and multi-tenant web apps tailored around your business requirements.",
    capabilities: [
      "SaaS Platforms",
      "Admin Dashboards",
      "Customer Portals",
      "Booking & Reservation Engines",
      "Custom CRM Systems",
      "Marketplace Platforms",
    ],
    tags: ["SCALABLE", "CLOUD-NATIVE", "REAL-TIME"],
    image: "/images/services/02-web-app.jpg",
    icon: "AppWindow",
    featured: true,
    metricsBadge: {
      title: "Cloud Performance",
      score: "99.9%",
      items: [
        { label: "API Latency", value: "<45ms" },
        { label: "Serverless Uptime", value: "99.99%" },
        { label: "Throughput", value: "10k req/s" },
        { label: "Zero Downtime", value: "Active" },
      ],
    },
    floatingBadge: {
      title: "Enterprise Architecture",
      subtitle: "Multi-Tenant • Role-Based Access",
    },
  },
  {
    id: "software-development",
    number: "03",
    title: "Custom Software\nDevelopment",
    categoryTag: "CUSTOM SOFTWARE DEVELOPMENT",
    description:
      "Tailor-made software solutions designed to automate manual business processes, streamline operational workflows, and scale seamlessly.",
    capabilities: [
      "Business Workflow Automation",
      "Internal Enterprise Tools",
      "Custom Management Software",
      "Data Processing Pipelines",
      "Microservice Architectures",
      "Automated Reporting",
    ],
    tags: ["BESPOKE", "AUTOMATED", "ROBUST"],
    image: "/images/services/03-software-dev.jpg",
    icon: "Cpu",
    featured: true,
    metricsBadge: {
      title: "Automation Efficiency",
      score: "4.2x",
      items: [
        { label: "Process Speed", value: "+320%" },
        { label: "Error Reduction", value: "-99.4%" },
        { label: "Manual Hours Saved", value: "120h/mo" },
        { label: "Tech Debt", value: "Zero" },
      ],
    },
    floatingBadge: {
      title: "Pipeline Infrastructure",
      subtitle: "Event-Driven • Fault Tolerant",
    },
  },
  {
    id: "ui-ux-design",
    number: "04",
    title: "UI/UX & Product\nDesign",
    categoryTag: "UI/UX & PRODUCT DESIGN",
    description:
      "Human-centered digital product design combining in-depth user research, wireframing, design systems, and interactive motion prototypes.",
    capabilities: [
      "User Research & Mapping",
      "Wireframing & Prototyping",
      "Scalable Design Systems",
      "Web & Mobile UI Design",
      "Interactive Motion Design",
      "Design Token Architecture",
    ],
    tags: ["INTUITIVE", "USER-CENTERED", "POLISHED"],
    image: "/images/services/04-ui-ux.jpg",
    icon: "Palette",
    featured: true,
    metricsBadge: {
      title: "Design System",
      score: "100%",
      items: [
        { label: "Figma Tokens", value: "500+" },
        { label: "Component Sync", value: "Real-time" },
        { label: "Micro-Interactions", value: "60fps" },
        { label: "Accessibility", value: "WCAG AAA" },
      ],
    },
    floatingBadge: {
      title: "Interaction Fidelity",
      subtitle: "Interactive Spring Motion",
    },
  },
  {
    id: "api-integrations",
    number: "05",
    title: "API & System\nIntegrations",
    categoryTag: "API & SYSTEM INTEGRATIONS",
    description:
      "Robust REST and GraphQL APIs, third-party payment integrations, CRM synchronizations, and custom webhooks connecting your core systems.",
    capabilities: [
      "REST & GraphQL APIs",
      "Payment Gateways (Stripe, PayPal)",
      "CRM & ERP Integrations",
      "Third-party SaaS Connectors",
      "Real-time Webhook Systems",
      "Database Sharding & Sync",
    ],
    tags: ["CONNECTED", "HIGH-THROUGHPUT", "SECURE"],
    image: "/images/services/05-api-integrations.jpg",
    icon: "Layers",
    featured: false,
    metricsBadge: {
      title: "Data Pipeline",
      score: "<28ms",
      items: [
        { label: "Webhook Sync", value: "<28ms" },
        { label: "Encryption", value: "AES-256" },
        { label: "Failover SLA", value: "99.999%" },
        { label: "Data Integrity", value: "100%" },
      ],
    },
    floatingBadge: {
      title: "Microservice Webhooks",
      subtitle: "Stripe • Salesforce • Cloud",
    },
  },
];
