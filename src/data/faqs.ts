export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqsData: FaqItem[] = [
  {
    id: "project-types",
    question: "What kind of projects do you work on?",
    answer: "We design and build custom corporate websites, high-converting digital products, SaaS web applications, internal enterprise tools, custom software solutions, and headless e-commerce platforms."
  },
  {
    id: "timeline",
    question: "How long does a project take to launch?",
    answer: "Standard web design & development projects typically take 4 to 6 weeks. Complex web applications, custom software platforms, or enterprise SaaS products range from 8 to 14 weeks depending on feature scope."
  },
  {
    id: "post-launch-support",
    question: "Do you provide post-launch maintenance and ongoing support?",
    answer: "Yes, absolutely. We offer monthly partnership models and ongoing dedicated maintenance retainers covering security updates, performance optimizations, feature enhancements, and 24/7 uptime monitoring."
  },
  {
    id: "existing-product",
    question: "Can you work with an existing product or refactor current code?",
    answer: "Yes. We regularly perform technical audits, codebase modernization, UI/UX redesigns, and API performance optimizations on existing Next.js, React, Node.js, and backend legacy systems."
  },
  {
    id: "custom-software",
    question: "Do you build custom software tailored around unique company workflows?",
    answer: "Yes! Custom software development is one of our primary core pillars. We analyze your team's operational manual tasks and engineer custom portals, CRMs, and automated workflow engines."
  },
  {
    id: "api-integrations",
    question: "Can you integrate third-party APIs like Stripe, CRMs, or AI endpoints?",
    answer: "Definitely. We have extensive expertise integrating payment providers (Stripe, PayPal, Plaid), CRMs (Salesforce, HubSpot), analytics tools, cloud storage (AWS S3), and LLM/AI models into web platforms."
  }
];
