import React from "react";

export interface TechItem {
  id: string;
  name: string;
  category: string;
  brandColor: string;
  badge: string;
  description: string;
  renderLogo: (className?: string) => React.ReactNode;
}

export interface TechCategoryGroup {
  id: string;
  title: string;
  subtitle: string;
  panelPosition: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  defaultAngle: {
    rotateZ: number;
    rotateY: number;
    rotateX: number;
  };
  items: TechItem[];
}

export const techLogoCollection: Record<string, TechItem> = {
  nextjs: {
    id: "nextjs",
    name: "Next.js",
    category: "Frontend",
    brandColor: "#000000",
    badge: "App Router & SSR",
    description: "React framework with Server Components & Edge rendering.",
    renderLogo: (className = "w-6 h-6") => (
      <svg className={className} viewBox="0 0 180 180" fill="none">
        <circle cx="90" cy="90" r="90" fill="#000000" />
        <path
          d="M149.508 157.438L69.1412 54H54V125.97H66.2774V69.5855L139.988 164.55C143.344 162.378 146.529 159.993 149.508 157.438Z"
          fill="url(#next_paint0_linear)"
        />
        <rect x="115" y="54" width="12" height="72" fill="url(#next_paint1_linear)" />
        <defs>
          <linearGradient
            id="next_paint0_linear"
            x1="109"
            y1="116.5"
            x2="144.5"
            y2="160.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="next_paint1_linear"
            x1="121"
            y1="54"
            x2="120.799"
            y2="106.875"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  react: {
    id: "react",
    name: "React",
    category: "Frontend",
    brandColor: "#61DAFB",
    badge: "UI Engine",
    description: "Component-driven interactive web applications.",
    renderLogo: (className = "w-6 h-6") => (
      <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="none">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  typescript: {
    id: "typescript",
    name: "TypeScript",
    category: "Frontend",
    brandColor: "#3178C6",
    badge: "Type Safety",
    description: "Static type checking for enterprise scalable codebases.",
    renderLogo: (className = "w-6 h-6") => (
      <svg className={className} viewBox="0 0 128 128">
        <rect width="128" height="128" rx="20" fill="#3178C6" />
        <path
          d="M60.67 85.34c0 3.2-.84 5.92-2.52 8.16-1.68 2.24-4.22 3.8-7.62 4.68-3.4.88-7.46 1.32-12.18 1.32-4.14 0-7.84-.36-11.1-1.08-3.26-.72-5.96-1.78-8.1-3.18v-9.66c2.46 1.76 5.34 3.14 8.64 4.14 3.3 1 6.54 1.5 9.72 1.5 3.74 0 6.44-.66 8.1-1.98 1.66-1.32 2.49-3.26 2.49-5.82 0-1.84-.52-3.32-1.56-4.44-1.04-1.12-2.54-2.12-4.5-3-1.96-.88-4.46-1.8-7.5-2.76-4.52-1.4-8.08-3.12-10.68-5.16-2.6-2.04-4.4-4.54-5.4-7.5-1-2.96-1.5-6.42-1.5-10.38 0-4.64 1.1-8.56 3.3-11.76 2.2-3.2 5.32-5.58 9.36-7.14 4.04-1.56 8.92-2.34 14.64-2.34 3.66 0 7.02.32 10.08.96 3.06.64 5.76 1.62 8.1 2.94l-3.36 9.42c-2.16-1.28-4.66-2.26-7.5-2.94-2.84-.68-5.74-1.02-8.7-1.02-3.56 0-6.18.6-7.86 1.8-1.68 1.2-2.52 3-2.52 5.4 0 1.76.5 3.16 1.5 4.2 1 1.04 2.44 1.98 4.32 2.82 1.88.84 4.28 1.74 7.2 2.7 4.72 1.48 8.42 3.26 11.1 5.34 2.68 2.08 4.54 4.62 5.58 7.62 1.04 3 1.56 6.54 1.56 10.62zm58.08-37.44H97.51v49.86H84.19V47.9H63.07V37.76h55.68v10.14z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  tailwind: {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Frontend",
    brandColor: "#06B6D4",
    badge: "Utility Styling",
    description: "Design-system based, ultra-performant CSS styling.",
    renderLogo: (className = "w-6 h-6") => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path
          d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"
          fill="#06B6D4"
        />
      </svg>
    ),
  },

  // Backend
  nodejs: {
    id: "nodejs",
    name: "Node.js",
    category: "Backend",
    brandColor: "#5FA04E",
    badge: "Server Runtime",
    description: "High-throughput, event-driven backend microservices.",
    renderLogo: (className = "w-6 h-6") => (
      <svg className={className} viewBox="0 0 32 32">
        <path
          d="M16 2.25l13.5 7.8v15.6L16 33.45 2.5 25.65V10.05L16 2.25z"
          fill="#5FA04E"
          transform="scale(0.85) translate(3, 0)"
        />
        <path
          d="M16 7.5L8 12.2v9.5l8 4.7 8-4.7v-9.5L16 7.5zm5.5 13.3l-5.5 3.2-5.5-3.2v-6.4l5.5-3.2 5.5 3.2v6.4z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  express: {
    id: "express",
    name: "Express",
    category: "Backend",
    brandColor: "#000000",
    badge: "REST Architecture",
    description: "Minimalist robust web framework for Node API endpoints.",
    renderLogo: (className = "w-6 h-6") => (
      <div className={`${className} rounded-full bg-[#111111] flex items-center justify-center text-white font-mono font-bold text-xs shadow-xs`}>
        ex
      </div>
    ),
  },
  python: {
    id: "python",
    name: "Python",
    category: "Backend",
    brandColor: "#3776AB",
    badge: "Data & AI Engine",
    description: "Clean scripting, API pipelines & intelligent automations.",
    renderLogo: (className = "w-6 h-6") => (
      <svg className={className} viewBox="0 0 128 128">
        <path
          d="M63.086 5c-15.545 0-25.047 1.4-25.047 1.4s-13.434 1.465-13.434 13.254c0 11.789 9.387 12.871 9.387 12.871h14.281v4.328H23.969S8.86 38.316 8.86 54.34c0 16.02 12.566 15.617 12.566 15.617s11.512.219 21.059.219v-9.672s-.422-11.453 11.238-11.453h18.895s10.375.148 10.375-9.875V20.086S85.742 5 63.086 5zm-13.32 8.363a4.09 4.09 0 0 1 4.09 4.086 4.09 4.09 0 0 1-4.09 4.09 4.09 4.09 0 0 1-4.086-4.09 4.09 4.09 0 0 1 4.086-4.086z"
          fill="#3776AB"
        />
        <path
          d="M64.914 123c15.547 0 25.047-1.4 25.047-1.4s13.434-1.465 13.434-13.254c0-11.789-9.387-12.871-9.387-12.871H79.727v-4.328h24.305s15.109-1.465 15.109-17.488c0-16.023-12.566-15.617-12.566-15.617s-11.512-.219-21.059-.219v9.672s.422 11.453-11.238 11.453H47.883s-10.375-.148-10.375 9.875v19.09S42.258 123 64.914 123zm13.32-8.363a4.09 4.09 0 0 1-4.09-4.086 4.09 4.09 0 0 1 4.09-4.09 4.09 4.09 0 0 1 4.086 4.09 4.09 4.09 0 0 1-4.086 4.086z"
          fill="#FFD438"
        />
      </svg>
    ),
  },
  firebase: {
    id: "firebase",
    name: "Firebase",
    category: "Backend",
    brandColor: "#FFA000",
    badge: "Cloud DB & Auth",
    description: "Real-time sync, serverless edge auth & cloud triggers.",
    renderLogo: (className = "w-6 h-6") => (
      <svg className={className} viewBox="0 0 32 32">
        <path d="M5.3 24.8L8.6 4.4a1 1 0 011.8-.4l4.5 8.5L5.3 24.8z" fill="#FFA000" />
        <path d="M19.8 10.6l-3.3-6.3a1 1 0 00-1.8 0L5.3 24.8l14.5-14.2z" fill="#FFCA28" />
        <path d="M26.7 24.8L23.4 9.4a1 1 0 00-1.7-.5l-6.8 15.9 11.8 0z" fill="#F57C00" />
        <path d="M16.1 27.5l8.7-4.8-2.6-1.5L5.3 24.8l9.4 5.3a2.6 2.6 0 002.5-.1l7.6-4.2-1.5-.9-7.2 2.6z" fill="#FFCA28" />
      </svg>
    ),
  },

  // CMS & E-Commerce
  wix: {
    id: "wix",
    name: "Wix & Velo",
    category: "CMS",
    brandColor: "#0C0C0C",
    badge: "Enterprise Web",
    description: "Custom business logic, booking engines & high-converting sites.",
    renderLogo: (className = "w-6 h-6") => (
      <div className={`${className} rounded-full bg-[#111111] flex items-center justify-center text-white font-sans font-black text-[10px] tracking-tighter shadow-xs`}>
        WiX
      </div>
    ),
  },
  wordpress: {
    id: "wordpress",
    name: "WordPress",
    category: "CMS",
    brandColor: "#21759B",
    badge: "Headless CMS",
    description: "Custom themes, REST API content management & Gutenberg.",
    renderLogo: (className = "w-6 h-6") => (
      <svg className={className} viewBox="0 0 128 128">
        <circle cx="64" cy="64" r="64" fill="#21759B" />
        <path
          d="M64 12C35.3 12 12 35.3 12 64c0 14.5 5.9 27.6 15.5 37.1L12.7 60.5c3.2-.1 6.3-.5 6.3-.5 2.9-.2 3.2-4.4.3-4.4 0 0-3.3.4-6.8.4l20.4-60.7C39 30.6 47.9 28 64 28c8.8 0 17 2.2 24.2 6.1L64 99.4 46.8 48.9c-2.9-.2-5.7-.4-5.7-.4-2.9-.2-3.3-4.4-.3-4.4 0 0 3.3.4 6.8.4l19.5 58c.2.6.8 1.1 1.5 1.1.7 0 1.3-.4 1.5-1.1L88.9 44.5l-4.7 14.1c-2.3 6.9-4.7 11.8-4.7 15.6 0 3.8 1.4 7.4 3.7 10.9l12.4 18.5C108 94.1 116 80 116 64c0-28.7-23.3-52-52-52z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  shopify: {
    id: "shopify",
    name: "Shopify",
    category: "CMS",
    brandColor: "#95BF47",
    badge: "Commerce Engine",
    description: "Liquid templates, custom storefronts & checkout conversions.",
    renderLogo: (className = "w-6 h-6") => (
      <svg className={className} viewBox="0 0 109 123" fill="none">
        <path
          d="M93.3 22.8c-.3-.2-.7-.1-.9.1L81.6 34.2c-1.3-4-4.8-6.9-8.9-6.9H69c-.6-4.6-2.5-8.9-5.6-12.2C59.7 11.2 54.4 9 48.7 9c-11.8 0-20.9 9.3-21.7 21.6-6.4 1.9-10.9 7.8-10.9 14.8 0 1 .1 2 .4 3L.2 99.7c-.2.7.2 1.4.9 1.6l71.4 20.9c.2.1.5.1.7 0l34.8-10.2c.6-.2 1-.7 1-1.3L94.2 23.3c-.2-.3-.5-.4-.9-.5z"
          fill="#95BF47"
        />
        <path
          d="M72.7 27.3H69c-.6-4.6-2.5-8.9-5.6-12.2C59.7 11.2 54.4 9 48.7 9c-11.8 0-20.9 9.3-21.7 21.6-6.4 1.9-10.9 7.8-10.9 14.8 0 1 .1 2 .4 3l-1.2 4.6 28.5 8.3 28.9-34z"
          fill="#7AB55C"
        />
        <path
          d="M57.6 44.8c-1.4-1.2-3.3-1.8-5.6-1.8-3.9 0-7.3 2-7.3 5.4 0 7.3 17 6.4 17 19.3 0 8.2-6.1 13.5-14.7 13.5-6.7 0-11-2.9-12.6-7.3l5.3-2.6c1 3.2 3.6 4.9 7.4 4.9 4.5 0 7.1-2.7 7.1-5.7 0-8.2-16.7-7-16.7-19.1 0-8.1 5.9-13.4 14.5-13.4 5.9 0 10.1 2.3 11.9 6.2l-6.3 3.6z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  strapi: {
    id: "strapi",
    name: "Strapi",
    category: "CMS",
    brandColor: "#4945FF",
    badge: "API-Driven CMS",
    description: "Customizable open-source headless CMS & GraphQL.",
    renderLogo: (className = "w-6 h-6") => (
      <svg className={className} viewBox="0 0 128 128" fill="none">
        <rect width="128" height="128" rx="28" fill="#4945FF" />
        <path
          d="M40 88L40 40L88 40L88 88L40 88Z"
          fill="#4945FF"
        />
        <path
          d="M40 64H64V88H40V64Z"
          fill="#8C89FF"
        />
        <path
          d="M64 40H88V64H64V40Z"
          fill="#A4A2FF"
        />
        <path
          d="M40 40H64V64H40V40Z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },

  // Databases
  mongodb: {
    id: "mongodb",
    name: "MongoDB",
    category: "Database",
    brandColor: "#47A248",
    badge: "Document DB",
    description: "Flexible JSON document store with aggregation pipelines.",
    renderLogo: (className = "w-6 h-6") => (
      <svg className={className} viewBox="0 0 64 64">
        <path
          d="M32 2C32 2 17 22.4 17 38.3C17 48.7 23.3 57.5 32 62C40.7 57.5 47 48.7 47 38.3C47 22.4 32 2 32 2Z"
          fill="#47A248"
        />
        <path
          d="M32 2V62C40.7 57.5 47 48.7 47 38.3C47 22.4 32 2 32 2Z"
          fill="#3FA037"
        />
        <path
          d="M32 12C32 12 30 25 30 38C30 46 32 54 32 54C32 54 34 46 34 38C34 25 32 12 32 12Z"
          fill="#F5FAF3"
        />
      </svg>
    ),
  },
  postgresql: {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Database",
    brandColor: "#336791",
    badge: "Relational SQL",
    description: "Battle-tested relational database with ACID guarantees.",
    renderLogo: (className = "w-6 h-6") => (
      <svg className={className} viewBox="0 0 128 128">
        <circle cx="64" cy="64" r="64" fill="#336791" />
        <path
          d="M64 24c-19.8 0-36 14.8-36 33.3 0 11.2 5.9 21.2 15.2 27.2l-3.2 14.5 13.8-7.5c3.2 1.2 6.6 1.9 10.2 1.9 19.8 0 36-14.8 36-33.3S83.8 24 64 24zm12.5 45.4l-7.7-12.8 1.4-2.3c1.7-2.9 2.6-6.1 2.6-9.5 0-7.8-6.1-14.2-13.6-14.2s-13.6 6.4-13.6 14.2c0 3.3.9 6.5 2.6 9.4l1.4 2.4-7.7 12.8c-1.3 2.1-.4 4.8 1.8 5.8 2.2 1 4.9.1 5.9-2.1l4.9-8.1c1.5.5 3.1.8 4.7.8s3.2-.3 4.7-.8l4.9 8.1c1 1.7 2.8 2.6 4.6 2.6.7 0 1.5-.1 2.2-.5 2.2-1 3.1-3.7 1.8-5.9z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  supabase: {
    id: "supabase",
    name: "Supabase",
    category: "Database",
    brandColor: "#3ECF8E",
    badge: "Open Source DB",
    description: "Postgres with row-level security, instant APIs & real-time.",
    renderLogo: (className = "w-6 h-6") => (
      <svg className={className} viewBox="0 0 109 113" fill="none">
        <path
          d="M63.7 110.3c-2.4 3-7.5 1.7-8.1-2.2L45 42.4h55.2c4.8 0 7.4 5.6 4.3 9.3l-40.8 58.6z"
          fill="#3ECF8E"
        />
        <path
          d="M45.5 2.4c2.4-3 7.5-1.7 8.1 2.2l10.6 65.7H9c-4.8 0-7.4-5.6-4.3-9.3L45.5 2.4z"
          fill="#249361"
        />
      </svg>
    ),
  },

  // Cloud & DevOps
  aws: {
    id: "aws",
    name: "AWS",
    category: "Cloud",
    brandColor: "#FF9900",
    badge: "Cloud Scale",
    description: "S3 asset storage, CloudFront CDN & Lambda edge compute.",
    renderLogo: (className = "w-6 h-6") => (
      <svg className={className} viewBox="0 0 128 128">
        <rect width="128" height="128" rx="24" fill="#232F3E" />
        <path
          d="M41 46.5c-4.3 0-7.8 2.2-7.8 6.4 0 8.3 19 4 19 14.5 0 6.6-5.8 9.6-12.2 9.6-6.4 0-11.8-2.6-13.8-5.3l3.6-5.3c1.7 2.1 6.1 4.3 10.2 4.3 3.6 0 5.6-1.5 5.6-3.8 0-8.2-19-4.2-19-14.7 0-6.2 5.5-9.3 11.8-9.3 5.4 0 9.8 1.8 12.2 3.8l-3.3 5.4c-1.8-1.5-4.8-2.8-8.3-2.8zM65 44h7l12.8 32.5h-7.6l-2.6-7.2h-12l-2.6 7.2H52.5L65 44zm8 19l-4.4-12.8L64.2 63H73zm25.8-19h6.8l5.8 22.8 5.8-22.8h6.8l-9.2 32.5h-6.8L98.8 44z"
          fill="#FFFFFF"
        />
        <path
          d="M32 87c22.5 13.5 53 10.5 69.5-2.2.6-.5 1.5-.2 1.3.5-1.9 6.2-11.5 13.7-33 13.7-22.8 0-39-10.2-40.3-11.2-.5-.4-.1-1.1.5-.8z"
          fill="#FF9900"
        />
      </svg>
    ),
  },
  vercel: {
    id: "vercel",
    name: "Vercel",
    category: "Cloud",
    brandColor: "#000000",
    badge: "Edge Deploy",
    description: "Automated global CDN, atomic rollbacks & zero-downtime.",
    renderLogo: (className = "w-6 h-6") => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L24 22H0L12 2Z" fill="#000000" />
      </svg>
    ),
  },
  docker: {
    id: "docker",
    name: "Docker",
    category: "Cloud",
    brandColor: "#2496ED",
    badge: "Containers",
    description: "Reproducible containerized staging & production setups.",
    renderLogo: (className = "w-6 h-6") => (
      <svg className={className} viewBox="0 0 128 128">
        <rect width="128" height="128" rx="24" fill="#2496ED" />
        <path
          d="M109.8 58.7c-1.2-.8-4-1.2-6.5-.4-1.2.4-2.3 1.2-3.1 2.1-4.2-2.8-10.3-2.6-14.7.5-.6.4-1.2.9-1.7 1.4-2.9-1.9-6.4-2.9-10.1-2.9-4.2 0-8.3 1.4-11.6 3.9H50.8v-8.3H61V44H50.8V33H40.6v11h-10v10.9h10v8.3H18.2c-.8 0-1.6.4-2 1.1-.4.7-.4 1.6 0 2.3 2.9 5.8 7.3 10.7 12.8 14.2 8.3 5.3 18.2 8.2 28.3 8.2 24.6 0 45.4-17.1 52.5-40.3z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  github: {
    id: "github",
    name: "GitHub",
    category: "Cloud",
    brandColor: "#181717",
    badge: "CI/CD Actions",
    description: "Version control, automated build pipelines & releases.",
    renderLogo: (className = "w-6 h-6") => (
      <svg className={className} viewBox="0 0 24 24" fill="#181717">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    ),
  },

  // Design & Animation
  figma: {
    id: "figma",
    name: "Figma",
    category: "Design",
    brandColor: "#F24E1E",
    badge: "UI Architecture",
    description: "Design systems, interactive prototypes & tokens.",
    renderLogo: (className = "w-6 h-6") => (
      <svg className={className} viewBox="0 0 38 57" fill="none">
        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
      </svg>
    ),
  },
  framer: {
    id: "framer",
    name: "Framer",
    category: "Design",
    brandColor: "#0055FF",
    badge: "Web Layouts",
    description: "Advanced interaction layout & responsive animations.",
    renderLogo: (className = "w-6 h-6") => (
      <svg className={className} viewBox="0 0 24 24" fill="#0055FF">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
      </svg>
    ),
  },
  gsap: {
    id: "gsap",
    name: "GSAP",
    category: "Design",
    brandColor: "#0AE448",
    badge: "Cinema Motion",
    description: "High-performance scroll-driven and timeline animations.",
    renderLogo: (className = "w-6 h-6") => (
      <div className={`${className} rounded-full bg-[#111111] border border-[#0AE448]/60 flex items-center justify-center font-mono font-black text-[9px] text-[#0AE448] tracking-tighter shadow-xs`}>
        GSAP
      </div>
    ),
  },
  lottie: {
    id: "lottie",
    name: "Lottie",
    category: "Design",
    brandColor: "#00DDB3",
    badge: "Vector FX",
    description: "Lightweight vector JSON micro-interactions.",
    renderLogo: (className = "w-6 h-6") => (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path
          d="M3.5 12C3.5 7.3 7.3 3.5 12 3.5C16.7 3.5 20.5 7.3 20.5 12C20.5 16.7 16.7 20.5 12 20.5C7.3 20.5 3.5 16.7 3.5 12Z"
          stroke="#00DDB3"
          strokeWidth="2.5"
        />
        <path
          d="M9 8.5L16 12L9 15.5V8.5Z"
          fill="#00DDB3"
        />
      </svg>
    ),
  },

  // Other Tools
  vscode: {
    id: "vscode",
    name: "VS Code",
    category: "Tools",
    brandColor: "#007ACC",
    badge: "IDE Environment",
    description: "Modern editor with strict linting & debugging tools.",
    renderLogo: (className = "w-6 h-6") => (
      <svg className={className} viewBox="0 0 128 128">
        <path
          d="M94.6 122.9c3.1 1.7 7 1.3 9.7-1.1l20-17.7c2.4-2.1 3.7-5.1 3.7-8.3V32.2c0-3.2-1.3-6.2-3.7-8.3l-20-17.7c-2.7-2.4-6.6-2.8-9.7-1.1-3.1 1.7-5.1 5-5.1 8.5V26L48.1 4.7c-2.4-2-5.7-2.4-8.5-1.1L7.5 18.2c-3.5 1.7-5.5 5.3-5 9.2.5 3.9 3.4 7 7.3 7.7l50 9.8L2.4 83c-2.9 2.5-3.5 6.8-1.5 10 2 3.2 6.1 4.6 9.8 3.2l37.4-14.7 41.4 32.9v8.5c0 3.5 2 6.8 5.1 8.5z"
          fill="#007ACC"
        />
      </svg>
    ),
  },
  git: {
    id: "git",
    name: "Git",
    category: "Tools",
    brandColor: "#F05032",
    badge: "Version Control",
    description: "Distributed branch workflows, rebasing & safe tags.",
    renderLogo: (className = "w-6 h-6") => (
      <svg className={className} viewBox="0 0 128 128">
        <path
          d="M124.7 57.3L70.7 3.3c-4.4-4.4-11.6-4.4-16 0L39.3 18.7l20.3 20.3c4.7-1.6 10.2-.5 13.9 3.2 3.7 3.7 4.8 9.2 3.2 13.9l19.5 19.5c4.7-1.6 10.2-.5 13.9 3.2 5.5 5.5 5.5 14.5 0 20s-14.5 5.5-20 0c-4-4-4.9-9.8-2.9-14.7L68.7 65.5v32.7c1.4 1 2.7 2.4 3.7 4 5.5 5.5 5.5 14.5 0 20s-14.5 5.5-20 0c-5.5-5.5-5.5-14.5 0-20 1.5-1.5 3.3-2.6 5.2-3.3V64.6c-1.9-.7-3.7-1.8-5.2-3.3-4-4-4.9-9.8-2.9-14.7L29.3 26.4 3.3 52.4c-4.4 4.4-4.4 11.6 0 16l54 54c4.4 4.4 11.6 4.4 16 0l51.4-51.1c4.4-4.4 4.4-11.6 0-16z"
          fill="#F05032"
        />
      </svg>
    ),
  },
  postman: {
    id: "postman",
    name: "Postman",
    category: "Tools",
    brandColor: "#FF6C37",
    badge: "API Testing",
    description: "Automated endpoint tests, mock servers & documentation.",
    renderLogo: (className = "w-6 h-6") => (
      <svg className={className} viewBox="0 0 128 128">
        <circle cx="64" cy="64" r="64" fill="#FF6C37" />
        <path
          d="M85 36c-4.4-2.8-10.3-2.3-14.2 1.4L44.5 63.8c-2.4 2.3-5.7 3.5-9 3.3l-10-.7c-2-.1-3.6 1.4-3.7 3.4-.1 2 1.4 3.6 3.4 3.7l10 .7c5 0 9.8-2 13.3-5.4l26.3-26.4c1.8-1.8 4.7-2 6.7-.5 2.1 1.5 2.6 4.4 1.1 6.5L62 76.7c-1.5 2.1-4 3.3-6.6 3.2l-6.8-.2c-2 0-3.6 1.6-3.6 3.6s1.6 3.6 3.6 3.6l6.8.2c4.4 0 8.6-2 11.3-5.5L87.3 56c3.4-4.6 2.4-11.2-2.3-14.2l-.02-.02z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  notion: {
    id: "notion",
    name: "Notion",
    category: "Tools",
    brandColor: "#000000",
    badge: "Product Docs",
    description: "Sprint roadmaps, sprint specifications & client portals.",
    renderLogo: (className = "w-6 h-6") => (
      <div className={`${className} rounded-md bg-[#111111] flex items-center justify-center text-white font-serif font-black text-xs shadow-xs`}>
        N
      </div>
    ),
  },
};

export const techCategoryGroups: TechCategoryGroup[] = [
  {
    id: "frontend",
    title: "Frontend & UI",
    subtitle: "Modern, responsive and interactive interfaces.",
    panelPosition: {
      top: "40px",
      left: "30px",
    },
    defaultAngle: {
      rotateZ: -1.2,
      rotateY: 3.5,
      rotateX: 1.5,
    },
    items: [
      techLogoCollection.react,
      techLogoCollection.nextjs,
      techLogoCollection.typescript,
      techLogoCollection.tailwind,
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    subtitle: "Scalable server-side solutions and integrations.",
    panelPosition: {
      top: "270px",
      left: "24px",
    },
    defaultAngle: {
      rotateZ: 0.6,
      rotateY: 4.5,
      rotateX: -1,
    },
    items: [
      techLogoCollection.nodejs,
      techLogoCollection.express,
      techLogoCollection.python,
      techLogoCollection.firebase,
    ],
  },
  {
    id: "design",
    title: "Design & Motion",
    subtitle: "Beautiful visuals and smooth experiences.",
    panelPosition: {
      top: "500px",
      left: "30px",
    },
    defaultAngle: {
      rotateZ: -0.8,
      rotateY: 2.5,
      rotateX: -2.5,
    },
    items: [
      techLogoCollection.figma,
      techLogoCollection.framer,
      techLogoCollection.gsap,
      techLogoCollection.lottie,
    ],
  },
  {
    id: "cms",
    title: "CMS & E-commerce",
    subtitle: "Flexible content and powerful commerce solutions.",
    panelPosition: {
      top: "30px",
      right: "30px",
    },
    defaultAngle: {
      rotateZ: 1.0,
      rotateY: -3.5,
      rotateX: 1.5,
    },
    items: [
      techLogoCollection.wix,
      techLogoCollection.wordpress,
      techLogoCollection.shopify,
      techLogoCollection.strapi,
    ],
  },
  {
    id: "database",
    title: "Databases & Storage",
    subtitle: "Reliable data management and storage.",
    panelPosition: {
      top: "210px",
      right: "24px",
    },
    defaultAngle: {
      rotateZ: -0.7,
      rotateY: -4.5,
      rotateX: -1,
    },
    items: [
      techLogoCollection.mongodb,
      techLogoCollection.postgresql,
      techLogoCollection.firebase,
      techLogoCollection.supabase,
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    subtitle: "Secure deployment and scalable infrastructure.",
    panelPosition: {
      top: "390px",
      right: "24px",
    },
    defaultAngle: {
      rotateZ: 1.2,
      rotateY: -2.8,
      rotateX: -2,
    },
    items: [
      techLogoCollection.aws,
      techLogoCollection.vercel,
      techLogoCollection.docker,
      techLogoCollection.github,
    ],
  },
  {
    id: "tools",
    title: "Other Tools & AI",
    subtitle: "Workflow, tooling and emerging intelligence.",
    panelPosition: {
      top: "570px",
      right: "30px",
    },
    defaultAngle: {
      rotateZ: -0.8,
      rotateY: -1.8,
      rotateX: -3,
    },
    items: [
      techLogoCollection.vscode,
      techLogoCollection.git,
      techLogoCollection.postman,
      techLogoCollection.notion,
    ],
  },
];
