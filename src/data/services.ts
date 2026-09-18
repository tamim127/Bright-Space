export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  capabilities: string[];
  icon: string;
  featured: boolean;
}

export const servicesData: ServiceItem[] = [
  {
    id: "web-design-dev",
    number: "01",
    title: "Website Design & Development",
    description: "Custom corporate websites, high-converting landing pages, and interactive digital experiences engineered for maximum conversion and speed.",
    capabilities: [
      "Corporate Websites",
      "Landing Pages",
      "Portfolio Websites",
      "Headless E-commerce",
      "CMS Websites (Sanity / Next.js)",
      "Performance & SEO Optimization"
    ],
    icon: "Layout",
    featured: true
  },
  {
    id: "web-applications",
    number: "02",
    title: "Web Application Development",
    description: "Scalable dashboards, SaaS platforms, internal management portals, and multi-tenant web apps tailored around your business requirements.",
    capabilities: [
      "SaaS Platforms",
      "Admin Dashboards",
      "Customer Portals",
      "Booking & Reservation Engines",
      "Custom CRM Systems",
      "Marketplace Platforms"
    ],
    icon: "AppWindow",
    featured: true
  },
  {
    id: "software-development",
    number: "03",
    title: "Custom Software Development",
    description: "Tailor-made software solutions designed to automate manual business processes, streamline operational workflows, and scale seamlessly.",
    capabilities: [
      "Business Workflow Automation",
      "Internal Enterprise Tools",
      "Custom Management Software",
      "Data Processing Pipelines",
      "Microservice Architectures"
    ],
    icon: "Cpu",
    featured: true
  },
  {
    id: "ui-ux-design",
    number: "04",
    title: "UI/UX & Product Design",
    description: "Human-centered digital product design combining in-depth user research, wireframing, design systems, and interactive motion prototypes.",
    capabilities: [
      "User Research & Mapping",
      "Wireframing & Prototyping",
      "Scalable Design Systems",
      "Web & Mobile UI Design",
      "Interactive Motion Design"
    ],
    icon: "Palette",
    featured: true
  },
  {
    id: "api-integrations",
    number: "05",
    title: "API & System Integrations",
    description: "Robust REST and GraphQL APIs, third-party payment integrations, CRM synchronizations, and custom webhooks connecting your core systems.",
    capabilities: [
      "REST & GraphQL APIs",
      "Payment Gateways (Stripe, PayPal)",
      "CRM & ERP Integrations",
      "Third-party SaaS Connectors",
      "Real-time Webhook Systems"
    ],
    icon: "Layers",
    featured: false
  }
];
